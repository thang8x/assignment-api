import { Injectable } from "@nestjs/common";
import { FeedBackEntity } from "src/entity/FeedBack.entity";
import { FeedBackRepositories } from "src/repositories/feedback.repositories";
import { ResidentsRepository } from "src/repositories/residents.repositories";
import { EmailService } from "./email.services";
import { AnswerFeedBack, CreateFeedbackInput, UpdateFeedBackInput } from "src/dto/feedback/create-feedback.input";
import { FeedbackStatus } from "src/constants/feedback-status.enum";


@Injectable()
export class FeedbackService {
    constructor(
        private readonly feedbackRepository: FeedBackRepositories,
        private readonly residentsRepository: ResidentsRepository,
        private readonly emailService: EmailService // Assuming you have an EmailService for sending emails
    ) {}

    async getAllFeedbacks(): Promise<FeedBackEntity[]> {
        return this.feedbackRepository.findAll();
    }

    async getFeedbackById(id: string): Promise<FeedBackEntity | null> {
        return this.feedbackRepository.findById(id);
    }

    async createFeedback(feedbackData: CreateFeedbackInput): Promise<FeedBackEntity> {
        const data =await this.feedbackRepository.create(feedbackData);

        if (data == null) {
            throw new Error("Failed to create feedback");
        }

        // send email to resident
        // get resident email from feedbackData
        const residentEmail = feedbackData.residentEmail;
        const subject = `Feedback Received: ${feedbackData.feedbackTitle}`;
        const resident = await this.residentsRepository.findById(feedbackData.residentId);

        if (resident) {
            const residentName = `${resident.firstName} ${resident.lastName}`;
            await this.emailService.sendEmail(residentEmail, subject, residentName, 'send-email-feedback.template');
        } else {
            console.error(`Resident with ID ${feedbackData.residentId} not found.`);
        }

        return data;
    }

    async updateFeedback(id: string, feedbackData: UpdateFeedBackInput): Promise<FeedBackEntity | null> {
        const checkUpdate = await this.feedbackRepository.checkIfFeebackExistsWithStatus(id, FeedbackStatus.OPEN);
        if (!checkUpdate) {
            throw new Error("Feedback not found or cannot be updated");
        }
        const updatedFeedback = await this.feedbackRepository.update(id, feedbackData);
        if (updatedFeedback) {
            // send email to resident
            const resident = await this.residentsRepository.findById(updatedFeedback.appartmentId);
            if (resident) {
                const residentEmail = updatedFeedback.residentEmail || resident.email;
                const subject = `Feedback Updated: ${updatedFeedback.feedbackTitle}`;
                const residentName = `${resident.firstName} ${resident.lastName}`;
                await this.emailService.sendEmail(residentEmail, subject, residentName, 'send-email-feedback.template');
            } else {
                console.error(`Resident with ID ${updatedFeedback.appartmentId} not found.`);
            }
        }   
        return updatedFeedback;
    }

    async answerFeedback(id: string, input: AnswerFeedBack): Promise<FeedBackEntity | null> {
        const checkUpdate = await this.feedbackRepository.checkIfFeebackExistsWithStatus(id, FeedbackStatus.OPEN);
        if (!checkUpdate) {
            throw new Error("Feedback not found or cannot be updated");
        }

        const answered = await this.feedbackRepository.answerFeedback(id, input);
        if (answered) {
            // send email to resident
            const resident = await this.residentsRepository.findById(answered.appartmentId);
            if (resident) {
                const residentEmail = answered.residentEmail || resident.email;
                const subject = `Feedback Answered: ${answered.feedbackTitle}`;
                const residentName = `${resident.firstName} ${resident.lastName}`;
                await this.emailService.sendEmail(residentEmail, subject, residentName, 'announce-resolved-issue-feedback.template');
            } else {
                console.error(`Resident with ID ${answered.appartmentId} not found.`);
            }
        }

        return answered;
    }
}