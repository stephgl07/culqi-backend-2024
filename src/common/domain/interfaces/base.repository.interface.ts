export interface IBaseRepository<T> {
    findById(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    create(entity: T): Promise<void>;
    update(id: string, entity: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<T | null>;
}