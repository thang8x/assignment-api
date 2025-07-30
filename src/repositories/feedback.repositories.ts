import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackStatus } from 'src/constants/feedback-status.enum';
import { AnswerFeedBack, CreateFeedbackInput, UpdateFeedBackInput } from 'src/dto/feedback/create-feedback.input';
import { FeedBackEntity } from 'src/entity/FeedBack.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeedBackRepositories {
    constructor(
        @InjectRepository(FeedBackEntity)
        private readonly repository: Repository<FeedBackEntity>
    ) {}

    async findAll(): Promise<FeedBackEntity[]> {
        return this.repository.find();
    }

    async findById(id: string): Promise<FeedBackEntity | null> {
        return this.repository.findOne({ where: { id } });
    }

    async findByIdAndStatus(id: string, status: FeedbackStatus): Promise<FeedBackEntity | null> {
        return this.repository.findOne({ where: { id, status } });
    }

    async findByApartmentId(appartmentId: string): Promise<FeedBackEntity[]> {
        return this.repository.find({ where: { appartmentId } });
    }

    async checkIfFeebackExistsWithStatus(id: string, status: FeedbackStatus): Promise<boolean> {
        const feedback = await this.repository.findOne({ where: { id, status } });
        return feedback !== null;
    }

    async create(feedback: CreateFeedbackInput): Promise<FeedBackEntity> {
        return this.repository.save(feedback);
    }

    async update(id: string, feedback: UpdateFeedBackInput): Promise<FeedBackEntity | null> {
        await this.repository.update(id, feedback);
        return this.findById(id);
    }

    async answerFeedback(id: string, answer: AnswerFeedBack): Promise<FeedBackEntity | null> {
        const feedback = await this.findById(id);
        if (!feedback) {
            throw new Error("Feedback not found");
        }
        feedback.resolveContent = answer.resolveContent ;
        feedback.status = FeedbackStatus.RESOLVED;
        feedback.answerDate = answer.answerDate;
        feedback.userAnswer = answer.userAnswer;
        feedback.updatedAt = new Date(); // Update the timestamp to current time
        return this.repository.save(feedback);
    }

    async changeStatus(id: string, status: FeedbackStatus): Promise<FeedBackEntity | null> {
        const feedback = await this.findById(id);
        if (feedback) {
            feedback.status = status;
            return this.repository.save(feedback);
        }
        return null;
    }    
}