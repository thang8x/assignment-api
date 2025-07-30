import { FeedbackStatus } from 'src/constants/feedback-status.enum';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('feedbacks')
export class FeedBackEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string; // UUID

    @Column({ type: 'varchar', nullable: false, length: 100 })
    feedbackTitle: string; // Title of the feedback
    @Column({ type: 'text', nullable: false })
    feedbackText: string; // Feedback text

    @Column({ type: 'text', nullable: true })
    resolveContent: string; // Content of the feedback

    @Column({ type: 'uuid', nullable: false})
    appartmentId: string; // Foreign key to the apartment entity

    @Column({ type: 'enum', enum: FeedbackStatus, default: FeedbackStatus.OPEN })
    status: FeedbackStatus; // Status of the feedback, using the FeedbackStatus enum

    @Column({ type: 'varchar', nullable: true, length: 100 })
    residentEmail: string; // User's email who provided the feedback

    @Column({ type: 'uuid', nullable: true, length: 100 })
    userAnswer: string; // User's answer to the feedback, if applicable

    @Column({ type: 'datetime', nullable: true })
    answerDate: Date; // Date when the user answered the feedback, if applicable

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date; // Timestamp when the feedback was created

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date; // Timestamp when the feedback was last updated
}