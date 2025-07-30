import { AccountRepository } from "src/repositories/account.repositories";
import { JwtStrategy } from "./jwt.strategy";
import { Injectable } from "@nestjs/common";
import { LoginInput } from "src/dto/account/login.input";
import { strict } from "assert";
import { stringify } from "querystring";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
 
    constructor(
        private readonly jwtService: JwtService,
        private readonly accountRepository: AccountRepository
    ){}

    async login(login: LoginInput) : Promise<any> {
        const data = {
            status: Number,
            message: String,
            account: {
                accountId: String,
                userName: String,
                role: Number,
                access_token: String,
                refresh_token: String,          
            }
            
        };

        const account = await this.accountRepository.findById(login.username);
        if (!account) {
            return {
                status: 404,
                message: "Account not found",
                account: null
            }
        }
        if (account.password !== login.password) {
            return {
                status: 401,
                message: "Invalid password",
                account: null
            }
        }

        const payload = {
            username: account.username,
            sub: account.id,
            role: account.role
        };

        const access_token = this.jwtService.sign(payload);
        const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' }); // Refresh token expires in 7 days

        return {
            status: 200,
            message: "Login successful",
            account: {
                accountId: account.id,
                userName: account.username,
                role: account.role,
                access_token: access_token,
                refresh_token: refresh_token
            }
        };
    }
}