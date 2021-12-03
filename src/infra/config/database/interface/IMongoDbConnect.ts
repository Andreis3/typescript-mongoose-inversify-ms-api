import mongoose from 'mongoose';

export default interface IMongoDbConnect {
    connect(): Promise<typeof mongoose>;
}
