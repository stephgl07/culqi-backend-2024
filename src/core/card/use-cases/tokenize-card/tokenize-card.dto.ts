import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsString, Length, Max, Min, Validate } from "class-validator";
import { IsExpirationYearValid } from "src/common/validation/custom/expiration-date-valid";

export class TokenizeCardRequest {
    @ApiProperty({ example: '4111111111111111', description: 'The card number', required: true })
    @IsString()
    @Length(13, 16)
    card_number: string;

    @ApiProperty({ example: '123', description: 'The card cvv' })
    @IsNumber()
    @Min(100, { message: 'The cvv must be 3 or 4 digits' })
    @Max(9999, { message: 'The cvv must be 3 or 4 digits' })
    cvv: number;

    @ApiProperty({ example: '12', description: 'The card expiration month', required: true })
    @IsNumber()
    @Min(1)      
    @Max(12)
    expiration_month: number;

    @ApiProperty({ example: '2025', description: 'The card expiration year', required: true })
    @IsString()
    @Length(4,4)
    @IsExpirationYearValid({ minYears: 0, maxYears: 5})
    expiration_year: string;

    @ApiProperty({ example: 'test@gmail.com', description: 'The card email', required: true })
    @IsEmail()
    @Length(5,100)
    email: string;
}

export class TokenizeCardResponse {
    token: string;
}