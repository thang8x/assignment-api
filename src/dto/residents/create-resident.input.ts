import { InputType, Field } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class CreateResidentInput {

        @Field({ nullable: false })
        @MaxLength(30)
        firstName: string; // Resident's first name
    
        @Field({ nullable: false })
        @MaxLength(50)
        lastName: string; // Resident's last name

        @Field({ nullable: false })        
        dateOfEntry: Date;
            
        @Field({ nullable: false })
        residentPhoneNumber: string; // Resident's phone number
    
        @Field({ nullable: false })
        email: string;
        
        @Field({ nullable: false })
        apartmentId: string; // Foreign key to the apartment entity
}   