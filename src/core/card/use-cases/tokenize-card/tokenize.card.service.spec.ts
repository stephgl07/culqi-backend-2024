import { Test, TestingModule } from '@nestjs/testing';
import { TokenizeCardService } from 'src/core/card/use-cases/tokenize-card/tokenize-card.service';
import { JwtService } from '@nestjs/jwt';
import { CardRepository } from 'src/common/repositories/card/card.redis.repository';
import { Card } from 'src/common/domain/entities/card.entity';
import { TokenizeCardRequest } from 'src/core/card/use-cases/tokenize-card/tokenize-card.dto';
import { RequestValidationError } from 'src/common/domain/exceptions/validation.exception';
import { AuthError } from 'src/common/domain/exceptions/auth.exception';

let mockJwtService: { sign: jest.Mock };
let mockCardRepository: { create: jest.Mock };

describe('TokenizeCardService', () => {
    let service: TokenizeCardService;

    beforeEach(async () => {
        mockJwtService = {
            sign: jest.fn(),
        };
        mockCardRepository = {
            create: jest.fn(),
        };
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TokenizeCardService,
                { provide: CardRepository, useValue: mockCardRepository },
                { provide: JwtService, useValue: mockJwtService },
            ],
        }).compile();
        service = module.get<TokenizeCardService>(TokenizeCardService);
    });

    it('should throw an error if the pk format is invalid', async () => {
        const mockPk = 'Bearer invalid_token_format_mocked';
        const mockTokenizeCardRequest: TokenizeCardRequest = {
            card_number: '1234',
            cvv: 123,
            expiration_month: 12,
            expiration_year: '2024',
            email: 'example@example.com',
        };

        await expect(
            service.execute(mockTokenizeCardRequest, mockPk),
        ).rejects.toThrow(RequestValidationError);

        expect(mockJwtService.sign).not.toHaveBeenCalled();
        expect(mockCardRepository.create).not.toHaveBeenCalled();
    });

    it('should throw an error if the pk was not provided', async () => {
        const mockPk_undefined = undefined;
        const mockPk_null = null;

        const mockTokenizeCardRequest: TokenizeCardRequest = {
            card_number: '1234',
            cvv: 123,
            expiration_month: 12,
            expiration_year: '2024',
            email: 'example@example.com',
        };

        await expect(
            service.execute(mockTokenizeCardRequest, mockPk_undefined),
        ).rejects.toThrow(RequestValidationError);
        await expect(
            service.execute(mockTokenizeCardRequest, mockPk_null),
        ).rejects.toThrow(RequestValidationError);

        expect(mockJwtService.sign).not.toHaveBeenCalled();
        expect(mockCardRepository.create).not.toHaveBeenCalled();
    });

    it('should create the token successfully', async () => {
        const mockPk = 'Bearer pk_valid_token_mocked';
        const mockTokenizeCardRequest: TokenizeCardRequest = {
            card_number: '1234',
            cvv: 123,
            expiration_month: 12,
            expiration_year: '2024',
            email: 'example@example.com',
        };

        await expect(
            service.execute(mockTokenizeCardRequest, mockPk)
        ).resolves.not.toThrow(AuthError);

        expect(mockCardRepository.create).toHaveBeenCalled();
    });

    it('should mapped the request to the card model', async () => {
        const expectedTokenGenerated = 'token_generated_mocked';
        const mockPk = 'Bearer pk_valid_token_mocked';
        const mockTokenizeCardRequest: TokenizeCardRequest = {
            card_number: '1234',
            cvv: 123,
            expiration_month: 12,
            expiration_year: '2024',
            email: 'example@example.com',
        };
        const mockCardDetails: Card = {
            card_number: '1234',
            cvv: 123,
            expiration_month: 12,
            expiration_year: '2024',
            email: 'example@example.com',
            token: expectedTokenGenerated,
            createdAt: new Date(),
        };

        mockJwtService.sign.mockResolvedValueOnce(expectedTokenGenerated);

        await service.execute(mockTokenizeCardRequest, mockPk);

        expect(mockCardRepository.create).toHaveBeenCalledWith({
            ...mockCardDetails,
            createdAt: expect.any(Date),
        });
    });

    it('should generate a token and return it for a valid card and pk', async () => {
        const mockPk = 'Bearer pk_valid_token_mocked';
        const mockTokenizeCardRequest: TokenizeCardRequest = {
            card_number: '1234',
            cvv: 123,
            expiration_month: 12,
            expiration_year: '2024',
            email: 'example@example.com',
        };
        const mockCardDetails: Card = {
            card_number: '1234',
            cvv: 123,
            expiration_month: 12,
            expiration_year: '2024',
            email: 'example@example.com',
            token: 'token_generated_mocked',
            createdAt: new Date(),
        };
        const expectedTokenGenerated = 'token_generated_mocked';

        mockJwtService.sign.mockResolvedValueOnce(expectedTokenGenerated);
        mockCardRepository.create.mockResolvedValueOnce(mockCardDetails);

        const tokenResponse = await service.execute(
            mockTokenizeCardRequest,
            mockPk,
        );

        expect(tokenResponse.token).toBe(expectedTokenGenerated);
        expect(mockJwtService.sign).toHaveBeenCalledWith(expect.any(Object));
        expect(mockCardRepository.create).toHaveBeenCalledWith(expect.objectContaining({
            ...mockTokenizeCardRequest,
            token: expectedTokenGenerated,
        }));
    });
});
