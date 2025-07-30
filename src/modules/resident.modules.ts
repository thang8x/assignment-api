import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedBackEntity } from "src/entity/FeedBack.entity";
import { ResidentMasterEntity } from "src/entity/ResidentMaster.entity";
import { ResidentsRepository } from "src/repositories/residents.repositories";
import { ResidentResolver } from "src/resolvers/residents.resolvers";
import { ResidentService } from "src/services/resident.services";

@Module({
    imports: [
        TypeOrmModule.forFeature([ResidentMasterEntity, FeedBackEntity]),
    ],
    providers: [ResidentsRepository, FeedBackEntity, ResidentService, ResidentResolver],
    exports: [ResidentsRepository, ResidentService, ResidentResolver],
})
export class ResidentModule {}