import { inject, injectable } from 'inversify';
import express, { Application } from 'express';
import { IApp } from './interface/IApp';
import { bodyParserJson, bodyParserUrlencoded } from '../../middlewares/BodyParser';
import { cors } from '../../middlewares/Cors';
import { contentType } from '../../middlewares/ContentType';
import TYPES from '../../../infra/constants/Type';
import IMongoDbConnect from '../../../infra/config/database/interface/IMongoDbConnect';
import { IRoutes } from '../routes/interface/IRoutes';

@injectable()
export default class App implements IApp {
    private readonly _app: Application;
    private readonly _port: number;
    @inject(TYPES.MongoDbConnect) private readonly mongoDbConnect: IMongoDbConnect;
    @inject(TYPES.Routes) private readonly routes: IRoutes;

    constructor() {
        this._app = express();
        this._port = 3000;
    }

    async start(): Promise<void> {
        this._app.use(bodyParserUrlencoded);
        this._app.use(bodyParserJson);
        this._app.use(cors);
        this._app.use(contentType);
        await this.routes.configureEndpoints(this._app);
        this._app.listen(this._port, () => {
            console.log(`Sever running at http://localhost:${this._port}`);
        });
        await this.mongoDbConnect.connect().then(() => {
            console.log('MongoDB connected');
        });
    }
}
