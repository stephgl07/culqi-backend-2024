import { Test, TestingModule } from '@nestjs/testing';
import { GetCardService } from 'src/core/card/use-cases/get-card/get-card.service';
import { BusinessError } from 'src/common/domain/exceptions/business.exception';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { AuthError } from 'src/common/domain/exceptions/auth.exception';
import { CardRepository } from 'src/common/repositories/card/card.redis.repository';
import { Card } from 'src/common/domain/entities/card.entity';
import { GetCardResponse } from 'src/core/card/use-cases/get-card/get-card.dto';

let mockJwtService: { verify: jest.Mock };
let mockCardRepository: { findByToken: jest.Mock };

describe('GetCardService', () => {
    let service: GetCardService;

    beforeEach(async () => {
        mockJwtService = {
            verify: jest.fn(),
        };
        mockCardRepository = {
            findByToken: jest.fn(),
        };
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetCardService,
                { provide: CardRepository, useValue: mockCardRepository },
                { provide: JwtService, useValue: mockJwtService },
            ],
        }).compile();
        service = module.get<GetCardService>(GetCardService);
    });

    it('should throw AuthError if token has expired', async () => {
        mockJwtService.verify.mockImplementation(() => {
            throw new TokenExpiredError('Token expired', new Date());
        });

        await expect(
            service.execute({ token: 'expired_token' }),
        ).rejects.toThrow(AuthError);

        expect(mockCardRepository.findByToken).not.toHaveBeenCalled();
    });

    it('should throw AuthError if token is invalid', async () => {
        mockJwtService.verify.mockImplementation(() => {
            throw new JsonWebTokenError('Invalid token');
        });

        await expect(
            service.execute({ token: 'invalid_token' }),
        ).rejects.toThrow(AuthError);

        expect(mockCardRepository.findByToken).not.toHaveBeenCalled();
    });

    it('should throw AuthError for an unknown authorization error', async () => {
        mockJwtService.verify.mockImplementation(() => {
            throw new Error('Unknown error');
        });

        await expect(service.execute({ token: 'some_token' })).rejects.toThrow(
            AuthError,
        );
        
        expect(mockCardRepository.findByToken).not.toHaveBeenCalled();
    });

    it('should throw BusinessError if card is not found', async () => {
        mockJwtService.verify.mockImplementation(() => true);
        mockCardRepository.findByToken.mockResolvedValueOnce(undefined);

        await expect(service.execute({ token: 'valid_token' })).rejects.toThrow(
            BusinessError,
        );

        expect(mockCardRepository.findByToken).toHaveBeenCalledWith(
            'valid_token',
        );
    });

    it('should return card details if token is valid', async () => {
        const mockCardDetails: Card = {
            card_number: '1234',
            cvv: 123,
            expiration_month: 12,
            expiration_year: '2024',
            email: 'example@example.com',
            token: 'valid_token',
            createdAt: new Date(),
        };
        const expectedServiceResponse: GetCardResponse = {
            card_number: mockCardDetails.card_number,
            expiration_month: mockCardDetails.expiration_month,
            expiration_year: mockCardDetails.expiration_year,
        };

        mockJwtService.verify.mockImplementation(() => true);
        mockCardRepository.findByToken.mockResolvedValueOnce(mockCardDetails);

        const result = await service.execute({ token: 'valid_token' });

        expect(mockCardRepository.findByToken).toHaveBeenCalledWith(
            'valid_token',
        );
        expect(result).toEqual(expectedServiceResponse);
    });
});
