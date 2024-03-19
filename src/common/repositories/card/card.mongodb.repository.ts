import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Card, CardDocument } from '../../domain/schemas/card.schema';
import { BaseRepository } from '../base/base.mongodb.repository';
import { ICardRepository } from 'src/common/domain/interfaces/card.repository.interface';
import { MongoDBError } from 'src/common/domain/exceptions/mongodb.exception';

@Injectable()
export class CardRepository
    extends BaseRepository<Card>
    implements ICardRepository
{
    constructor(
        @InjectModel(Card.name) private readonly cardModel: Model<CardDocument>,
    ) {
        super(cardModel);
    }

    async findByToken(token: string): Promise<Card | null> {
        try {
            return this.cardModel.findOne({ token });
        } catch (err) {
            throw new MongoDBError(err);
        }
    }
}
