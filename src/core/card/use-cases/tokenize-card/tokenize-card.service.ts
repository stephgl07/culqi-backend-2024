import { Inject, Injectable } from '@nestjs/common';
import { TokenizeCardRequest, TokenizeCardResponse } from './tokenize-card.dto';
import { ICardRepository } from 'src/common/domain/interfaces/card.repository.interface';
//import { CardRepository } from 'src/common/repositories/card/card.mongodb.repository';
import { CardRepository } from 'src/common/repositories/card/card.redis.repository';
import { JwtService } from '@nestjs/jwt';
import { TokenHeader } from '../token-header.dto';
import { validate } from 'class-validator';
import { validateRequiredFields } from 'src/common/validation/validation.util';
import { RequestValidationError } from 'src/common/domain/exceptions/validation.exception';
import { AuthError } from 'src/common/domain/exceptions/auth.exception';

@Injectable()
export class TokenizeCardService {
    constructor(
        @Inject(CardRepository)
        private readonly CardRepository: ICardRepository,
        private jwtTokenService: JwtService,
    ) {}

    async execute(
        card: TokenizeCardRequest,
        pk: string,
    ): Promise<TokenizeCardResponse> {
        // Validate pk
        const tokenHeader = new TokenHeader();
        tokenHeader.pk = pk;
        await this.validateToken(tokenHeader);

        // Generate a random token
        const token = await this.loginWithCredentials(pk);

        const cardModel = {
            ...card,
            token,
            createdAt: new Date(),
        };

        await this.CardRepository.create(cardModel);

        return { token };
    }

    async loginWithCredentials(pk: string): Promise<string> {
        try{
            const bearerToken = pk.split(' ')[1];
            return this.jwtTokenService.sign({ pk: bearerToken });
        }catch(err){
            throw new AuthError('Could not generate token from PK header');
        }
    }

    async validateToken(tokenHeader: TokenHeader): Promise<void> {
        const errors = await validate(tokenHeader, { stopAtFirstError: true });
        const filteredErrors = validateRequiredFields(errors);
        if (filteredErrors.length > 0) {
            throw new RequestValidationError(
                `Some validation errors where found on the Headers`,
                filteredErrors,
            );
        }
    }
}
