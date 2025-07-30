import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AppartmentEntity } from "./Appartment.entity";
import { ResidentStatus } from "src/constants/resident-status.enum";
import { Field, ObjectType } from "@nestjs/graphql";

@Entity('residentMasters')
@ObjectType()
export class ResidentMasterEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string; // UUID

    @Column({ type: 'varchar', nullable: false, length: 30 })
    @Field()
    firstName: string; // Resident's first name

    @Column({ type: 'varchar', nullable: false, length:50 })
    @Field()
    lastName: string; // Resident's last name
    
    @Column({ type: 'date', unique: true, nullable: false })
    @Field()
    dateOfEntry: Date;

    @Column({ type:'date', nullable: true })
    @Field({ nullable: true })
    dateOfLeave: Date;

    @Column({ type: 'varchar', nullable: false, unique: true, length: 15  })
    @Field()
    residentPhoneNumber: string; // Resident's phone number

    @Column({ type: 'varchar', unique: true, nullable: false })
    @Field()
    email: string;
    
    @Column({ type: 'uuid', nullable: false, length: 100 })
    @JoinColumn({ name: 'apartmentId' })
    @Field({ nullable: false })
    apartmentId: string; // Foreign key to the apartment entity

    @ManyToOne(() => AppartmentEntity, appartment => appartment.residents)
    @JoinColumn({ name: 'apartmentId' })
    apartment: AppartmentEntity; // Assuming this is a relation to the Appartment entity

    @Column({ type: 'enum', enum: ResidentStatus, default: ResidentStatus.AVAILABLE })
    @Field(() => ResidentStatus)
    residentStatus: ResidentStatus; // Status of the resident, using the ResidentStatus enum

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}