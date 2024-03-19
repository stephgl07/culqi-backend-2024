import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ICardRepository } from 'src/common/domain/interfaces/card.repository.interface';
import { Card } from 'src/common/domain/schemas/card.schema';
import { createClient, RedisClientType } from 'redis';
import { ConfigService } from '@nestjs/config';
import { RedisError } from 'src/common/domain/exceptions/redis.exception';
import { RedisClientService } from 'src/common/handlers/redis/redis-client.handler';

@Injectable()
export class CardRepository
    implements ICardRepository
{
    private readonly redisClient;
    private readonly redisDefaultTtl: number;

    constructor(
        private redisService: RedisClientService,
        protected configService: ConfigService,
    ) {
        this.redisClient = this.redisService.getClient();
        this.redisDefaultTtl = configService.get('redis').ttl;
    }

    async findByToken(token: string): Promise<Card | null> {
        try {
            const cardId = await this.redisClient.get(`token:${token}`);
            return cardId ? JSON.parse(cardId) : null;
        } catch (err) {
            throw new RedisError('Error finding card by token');
        }
    }

    async create(entity: Card): Promise<void> {
        try {
            const setResult = await this.redisClient.set(
                `token:${entity.token}`,
                JSON.stringify(entity),
                {
                    EX: this.redisDefaultTtl,
                },
            );
            if (setResult !== 'OK') throw new Error('Error creating card');
        } catch (err) {
            throw new RedisError('Error creating card');
        }
    }
}
