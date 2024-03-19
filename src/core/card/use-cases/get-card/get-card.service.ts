import { Inject, Injectable } from '@nestjs/common';
import { GetCardRequest, GetCardResponse } from './get-card.dto';
import { ICardRepository } from 'src/common/domain/interfaces/card.repository.interface';
//import { CardRepository } from 'src/common/repositories/card/card.mongodb.repository';
import { CardRepository } from 'src/common/repositories/card/card.redis.repository';
import { BusinessError } from 'src/common/domain/exceptions/business.exception';
import { JwtService, TokenExpiredError, JsonWebTokenError } from '@nestjs/jwt';
import { AuthError } from 'src/common/domain/exceptions/auth.exception';

@Injectable()
export class GetCardService {
    constructor(
        @Inject(CardRepository)
        private readonly CardRepository: ICardRepository,
        private jwtTokenService: JwtService,
    ) {}

    async execute(
        params: GetCardRequest
    ): Promise<GetCardResponse> {
        // Check if the token is valid
        await this.validateTokenFromHeader(params.token);

        const card = await this.CardRepository.findByToken(params.token);
        if (!card)
            throw new BusinessError('Card not found');

        // Mapping response
        const mappedCard: GetCardResponse = {
            card_number: card.card_number,
            expiration_month: card.expiration_month,
            expiration_year: card.expiration_year,
        };

        return mappedCard;
    }
    async validateTokenFromHeader(token: string): Promise<void> {
        try{
            this.jwtTokenService.verify(token);
        }catch(err){
            if (err instanceof TokenExpiredError){
                throw new AuthError('Token has expired');
            }
            if (err instanceof JsonWebTokenError){
                throw new AuthError('Token is invalid');
            }
            throw new AuthError('Unknown authorization error');
        }
    }
}
