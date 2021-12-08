import { inject, injectable } from 'inversify';
import express, { Express } from 'express';
import { IApp } from './interface/IApp';
import { bodyParserJson, bodyParserUrlencoded } from '../../middlewares/BodyParser';
import { cors } from '../../middlewares/Cors';
import { contentType } from '../../middlewares/ContentType';
import TYPES from '../../../infra/constants/Type';
import IMongoDbConnect from '../../../infra/config/database/interface/IMongoDbConnect';
import { IRoutes } from '../routes/interface/IRoutes';

@injectable()
export default class App implements IApp {
    private readonly _app: Express;
    private readonly _mongoDbConnect: IMongoDbConnect;
    private readonly _routes: IRoutes;

    constructor(@inject(TYPES.Routes) routes: IRoutes, @inject(TYPES.MongoDbConnect) mongoDbConnect: IMongoDbConnect) {
        this._app = express();
        this._routes = routes;
        this._mongoDbConnect = mongoDbConnect;
    }

    start(): Express {
        this._app.use(bodyParserUrlencoded);
        this._app.use(bodyParserJson);
        this._app.use(cors);
        this._app.use(contentType);
        this._routes.configureEndpoints(this._app);
        return this._app;
    }

    async connectMongo(): Promise<void> {
        await this._mongoDbConnect.connect().then(() => {
            console.log('MongoDB connected');
        });
    }
}
