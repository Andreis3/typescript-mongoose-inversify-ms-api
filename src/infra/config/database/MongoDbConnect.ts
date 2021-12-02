import { injectable } from 'inversify';
import mongoose from 'mongoose';
import IMongoDbConnect from './interface/IMongoDbConnect';

@injectable()
export default class MongoDbConnect implements IMongoDbConnect {
    private readonly _stringConnection: string;
    constructor() {
        this._stringConnection = 'mongodb://localhost:27017/products';
    }

    async connect(): Promise<typeof mongoose> {
        await mongoose.connect(this._stringConnection);
        return mongoose;
    }
}
