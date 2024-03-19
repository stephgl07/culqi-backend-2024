import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CardDocument = Card & Document;

@Schema({ collection: 'Cards' })
export class Card {
  @Prop({ required: true })
  card_number: string;

  @Prop({ required: true })
  cvv: number;

  @Prop({ required: true })
  expiration_month: number;

  @Prop({ required: true })
  expiration_year: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  createdAt: Date;
}

export const CardSchema = SchemaFactory.createForClass(Card);

CardSchema.index({ createdAt: 1 }, { expireAfterSeconds: 150 }); 