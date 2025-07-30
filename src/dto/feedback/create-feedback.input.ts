import { Field, InputType } from "@nestjs/graphql";
import { IsUUID, MaxLength } from "class-validator";

@InputType()
export class CreateFeedbackInput {

    @Field({ nullable: false })
    @MaxLength(100)
    feedbackTitle: string; // Title of the feedback

    @Field({ nullable: false })
    @MaxLength(500)
    feedbackText: string;

    @Field({ nullable: false })
    @IsUUID()    
    residentId: string; // ID of the resident providing the feedback

    @Field({ nullable: false })
    @IsUUID()
    appartmentId: string; // Foreign key to the apartment entity

    @Field({ nullable: true })
    residentEmail: string; // User's email who provided the feedback
}

@InputType()
export class UpdateFeedBackInput {

    @Field({ nullable: false })
    @IsUUID()
    id: string; // ID of the feedback to update
    @Field({ nullable: false })
    @MaxLength(100)
    feedbackTitle: string; // Title of the feedback

    @Field({ nullable: false })
    @MaxLength(500)
    feedbackText: string;   

    @Field({ nullable: true })
    residentEmail: string; // User's email who provided the feedback
}

export class AnswerFeedBack {
    @Field({ nullable: false })
    @IsUUID()
    userAnswer: string; // User's answer to the feedback, if applicable

    @Field({ nullable: true })
    answerDate: Date; // Date when the user answered the feedback, if applicable

    @Field({ nullable: true })
    @MaxLength(500)
    resolveContent: string; // Content of the feedback

}