import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountEntity } from "src/entity/Account.entity";
import { Repository } from "typeorm";

@Injectable()
export class AccountRepository {
    constructor(
        @InjectRepository(AccountEntity)
        private readonly accountRepositories: Repository<AccountEntity>
    ) {}

    async findAll(): Promise<AccountEntity[]> {
        return this.accountRepositories.find();
    }

    async findById(username: string): Promise<AccountEntity | null> {
        return await this.accountRepositories.findOneByOrFail({ username });
    }
}