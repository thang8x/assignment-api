import { Entity, PrimaryColumn } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { Column } from "typeorm";

@Entity('roles')
export class Role {
    @PrimaryColumn({type: 'char', length: 3})
    id: string; // UUID

    @Column({ type: 'varchar', unique: true, nullable: false })
    name: string; // Role name

    @Column({ type: 'text', nullable: true })
    description?: string; // Optional description of the role

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}