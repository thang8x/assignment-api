import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateResidentInput } from "src/dto/residents/create-resident.input";
import { UpdateResidentInput } from "src/dto/residents/update-resident.input";
import { ResidentMasterEntity } from "src/entity/ResidentMaster.entity";
import { Repository } from "typeorm";

@Injectable()
export class ResidentsRepository {

    constructor(
        @InjectRepository(ResidentMasterEntity)
        private readonly repository: Repository<ResidentMasterEntity>) {}

    async findAll(): Promise<ResidentMasterEntity[]> {
        return this.repository.find();
    }

    async findById(id: string): Promise<ResidentMasterEntity | null> {
        return this.repository.findOne({ where: { id } });
    }

    async create(resident: CreateResidentInput): Promise<ResidentMasterEntity> {
        return this.repository.save(resident);
    }

    async update(id: string, resident: UpdateResidentInput): Promise<ResidentMasterEntity | null> {
        await this.repository.update(id, resident);
        return this.findById(id);
    }

    async makeLeaveResident(id: string): Promise<ResidentMasterEntity | null> {
        const resident = await this.findById(id);
        if (resident) {
            resident.dateOfLeave = new Date();
            return this.repository.save(resident);
        }
        return null;
    }
}