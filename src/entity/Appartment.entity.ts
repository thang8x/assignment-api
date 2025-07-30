import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FloorEntity } from "./Floor.entity";
import { ResidentMasterEntity } from "./ResidentMaster.entity";
import { Field } from "@nestjs/graphql";


@Entity('appartments')
export class AppartmentEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string; // UUID

    @Column({ type: 'varchar', unique: true, nullable: false })
    @Field()
    apartmentNumber: string; // Apartment name
    
    @ManyToOne(() => FloorEntity, floor => floor.AppartmentEntity)
    @JoinColumn({ name: 'floorId' })
    @Field(() => FloorEntity)
    FloorEntity: FloorEntity; // Assuming this is a relation to the Floor entity    

    @OneToMany(() => ResidentMasterEntity, resident => resident.apartment)
    @Field(() => [ResidentMasterEntity], { nullable: true })
    residents: ResidentMasterEntity[]; // Assuming this is a relation to the ResidentMaster entity

    @Column({ type: 'uuid', nullable: false })
    @JoinColumn({ name: 'floorId' })
    floorId: string; // Foreign key to the floor entity
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}