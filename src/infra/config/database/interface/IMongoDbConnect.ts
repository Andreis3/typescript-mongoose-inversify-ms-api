export default interface IMongoDbConnect {
    connect(): Promise<void>;
}
