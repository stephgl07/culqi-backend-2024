import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches } from "class-validator";

export class TokenHeader {
    @ApiProperty({ example: '4111111111111111', description: 'The card number', required: true })
    @IsNotEmpty()
    @IsString()
    @Matches(/^Bearer\s+.+$/, { message: "The authorization type must be 'Bearer'" })
    @Matches(/^Bearer\s+pk_.+$/, { message: "The pk must start with 'pk_'" })
    pk: string;
}