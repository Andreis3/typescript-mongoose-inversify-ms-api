export default interface IMongoDbConnect {
    connect(): Promise<any>;
}
