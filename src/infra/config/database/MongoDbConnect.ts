import { injectable } from 'inversify';
import mongoose from 'mongoose';
import Env from '@/main/config/app/Env';
import IMongoDbConnect from '@/infra/config/database/interface/IMongoDbConnect';

@injectable()
export default class MongoDbConnect implements IMongoDbConnect {
    private readonly _stringConnection: string;
    constructor() {
        this._stringConnection = process.env.MONGO_URL || Env.mongoUrl;
    }

    async connect(): Promise<void> {
        await mongoose.connect(this._stringConnection);
    }

    async disconnect(): Promise<void> {
        await mongoose.disconnect();
    }

    async dropDatabase(): Promise<void> {
        await mongoose.connection.dropDatabase();
    }

    async clearCollection(collectionName: string): Promise<void> {
        await mongoose.connection.db.dropCollection(collectionName);
    }
}
