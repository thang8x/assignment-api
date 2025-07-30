import { Injectable } from "@nestjs/common";
import { CreateResidentInput } from "src/dto/residents/create-resident.input";
import { UpdateResidentInput } from "src/dto/residents/update-resident.input";
import { ResidentMasterEntity } from "src/entity/ResidentMaster.entity";
import { ResidentsRepository } from "src/repositories/residents.repositories";

@Injectable()
export class ResidentService {
    constructor(
       private readonly residentsRepository: ResidentsRepository
    ) {}

    async getAllResidents(): Promise<ResidentMasterEntity[]> {
        return this.residentsRepository.findAll();
    }

    async getResidentById(id: string): Promise<ResidentMasterEntity | null> {
        return this.residentsRepository.findById(id);
    }

    async createResident(residentData: CreateResidentInput): Promise<ResidentMasterEntity> {
        return this.residentsRepository.create(residentData);
    }

    async updateResident(id: string, residentData: UpdateResidentInput): Promise<ResidentMasterEntity | null> {
        return this.residentsRepository.update(id, residentData);
    }

    async makeResidentLeave(id: string): Promise<ResidentMasterEntity | null> {
        return this.residentsRepository.makeLeaveResident(id);
    }
}

