import { Args, Mutation } from "@nestjs/graphql";
import { LoginInput } from "src/dto/account/login.input";
import { AuthService } from "src/services/jwt.serivces";

export class AuthResolver {
    constructor(private readonly authService: AuthService) {}
    
    @Mutation()
    async login(@Args('input') loginInput: LoginInput): Promise<any> {
        return await this.authService.login(loginInput);
    }
    
}



