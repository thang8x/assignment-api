import { Entity } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Column } from 'typeorm';

@Entity('accounts')
export class AccountEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string; // UUI

    @Column({type: 'varchar', unique: true, nullable: false})
    username: string;

    @Column({type: 'varchar', unique: true, nullable: false})
    email: string;

    @Column({type: 'int', nullable: false})
    role: number; // Assuming role is a number, could be an enum

    @Column({type: 'varchar', nullable: false})
    password: string; // Store hashed password

    @Column({type: 'boolean', default: false})
    locked: boolean;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;    
}


