import { Model, UpdateQuery } from 'mongoose';
import { IBaseRepository } from '../../domain/interfaces/base.repository.interface';
import { MongoDBError } from 'src/common/domain/exceptions/mongodb.exception';

export class BaseRepository<T> implements IBaseRepository<T> {
    constructor(private readonly model: Model<T>) {}

    async findAll(): Promise<T[]> {
        try {
            return this.model.find().exec();
        } catch (err) {
            throw new MongoDBError(err);
        }
    }

    async findById(id: string): Promise<T> {
        try {
            return this.model.findById(id).exec();
        } catch (err) {
            throw new MongoDBError(err);
        }
    }

    async create(entity: T): Promise<void> {
        try {
            const newEntity = new this.model(entity);
            newEntity.save();
        } catch (err) {
            throw new MongoDBError(err.message);
        }
    }

    async update(id: string, entity: UpdateQuery<T>): Promise<T> {
        try {
            return this.model
                .findByIdAndUpdate(id, entity, { new: true })
                .exec();
        } catch (err) {
            throw new MongoDBError(err.message);
        }
    }

    async delete(id: string): Promise<T> {
        try {
            return this.model.findByIdAndDelete(id).exec();
        } catch {
            throw new Error('Error deleting entity');
        }
    }
}
