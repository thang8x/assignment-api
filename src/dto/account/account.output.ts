import { Field, ObjectType } from "@nestjs/graphql";
import { UUID } from "crypto";

@ObjectType() 
export class AccountOutput {
    @Field(() => String)  
    id: string;

    @Field(() => String)
    username: string;

    @Field(() => String)
    email: string;

    @Field(() => Number)
    role: number;

    @Field(() => String)
    accessToken: string;

    @Field(() => String)
    refreshToken: string;
}