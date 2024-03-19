import { Card } from "../schemas/card.schema";

export interface ICardRepository{
    findByToken(token: string): Promise<Card | null>;
    create(entity: Card): Promise<void>;
}