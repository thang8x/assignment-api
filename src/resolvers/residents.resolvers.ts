
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AnswerFeedBack, CreateFeedbackInput, UpdateFeedBackInput } from "src/dto/feedback/create-feedback.input";
import { CreateResidentInput } from "src/dto/residents/create-resident.input";
import { UpdateResidentInput } from "src/dto/residents/update-resident.input";
import { FeedBackEntity } from "src/entity/FeedBack.entity";
import { ResidentMasterEntity } from "src/entity/ResidentMaster.entity";
import { FeedbackService } from "src/services/feedback.services";
import { ResidentService } from "src/services/resident.services";

@Resolver()
export class ResidentResolver {

    constructor(
        private readonly residentService: ResidentService,
        private readonly feedbackService: FeedbackService,
    ) {
        // Resolver constructor logic can be added here if needed
    }

    @Query(() => [ResidentMasterEntity])
    async getAllResidents() : Promise<ResidentMasterEntity[]> {
        return await this.residentService.getAllResidents();
    }

    @Query(() => ResidentMasterEntity, { nullable: true })
    async getResidentById(id: string): Promise<ResidentMasterEntity | null> {
        return await this.residentService.getResidentById(id);
    }

    @Mutation(() => ResidentMasterEntity)
    async createResident(@Args("input") residentData: CreateResidentInput): Promise<ResidentMasterEntity> {
        return await this.residentService.createResident(residentData);
    }

    @Mutation(() => ResidentMasterEntity, { nullable: true })
    async updateResident(@Args("id") id: string, @Args("input") residentData: UpdateResidentInput): Promise<ResidentMasterEntity | null> {
        return await this.residentService.updateResident(id, residentData);
    }

    @Mutation(() => FeedBackEntity, { nullable: true })
    async sendFeedbackToService(@Args("residentId") input: CreateFeedbackInput): Promise<void> {
        const resident = await this.residentService.getResidentById(input.residentId);
        if (!resident) {
            throw new Error("Resident not found");
        }
        // Assuming feedbackService.createFeedback handles the logic of sending feedback
        await this.feedbackService.createFeedback(input);
    }

    @Mutation(() => ResidentMasterEntity, { nullable: true })
    async updateFedback(@Args("input") feedbackData: UpdateFeedBackInput): Promise<FeedBackEntity | null> 
    {
        return await this.feedbackService.updateFeedback(feedbackData.id, feedbackData);
    }

    @Mutation(() => FeedBackEntity, { nullable: true })
    async answerFeedback(@Args("id")id: string, @Args("input") input: AnswerFeedBack): Promise<FeedBackEntity | null> {
        return await this.feedbackService.answerFeedback(id, input);
    }

    @Mutation(() => ResidentMasterEntity, { nullable: true })
    async getAllFeedbacks(): Promise<FeedBackEntity[]> {
        return await this.feedbackService.getAllFeedbacks();
    }
    
    @Query(() => FeedBackEntity, { nullable: true })
    async getFeedbackById(@Args("id") id: string): Promise<FeedBackEntity | null> {
        return await this.feedbackService.getFeedbackById(id);  
    }
}