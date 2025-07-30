import { Entity, OneToMany } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { Column } from "typeorm";
import { AppartmentEntity } from "./Appartment.entity";
import { Field, ObjectType } from "@nestjs/graphql";

@Entity('floors')
@ObjectType()
export class FloorEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string; // UUID

    @Column({ type: 'int', unique: true, nullable: false })
    @Field(() => Number)
    floorNumber: number; // Floor name

    @Column({ type: 'text', nullable: true })
    @Field(() => String, { nullable: true })
    description?: string; // Optional description of the floor

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @Field(() => Date)
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @Field(() => Date)
    updatedAt: Date;

    @OneToMany(() => AppartmentEntity, appartment => appartment.FloorEntity)
    @Field(() => [AppartmentEntity], { nullable: true })
    AppartmentEntity: AppartmentEntity[]; // Assuming this is a relation to the Appartment entity
}