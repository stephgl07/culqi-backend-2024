import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
//import { CardRepository } from './card/card.mongodb.repository';
//import { Card, CardSchema } from '../domain/schemas/card.schema';
import { CardRepository } from './card/card.redis.repository';
import { RedisClientService } from '../handlers/redis/redis-client.handler';

@Global()
@Module({
  // imports: [
  //   MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
  // ],
  providers: [CardRepository, RedisClientService],
  exports: [CardRepository]
})
export class RepositoryModule {}