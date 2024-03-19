import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class GetCardRequest {
    @ApiProperty({  
        description: 'The token generated', 
        required: true, 
        example: '1234567890123456'
    })
    @IsString()
    token: string;
}

export class GetCardResponse {
    card_number: string;
    expiration_month: number;
    expiration_year: string;
}