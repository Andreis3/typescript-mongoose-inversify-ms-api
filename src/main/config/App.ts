import express, { Application } from 'express';
import { injectable } from 'inversify';
import { IApp } from './IApp';
import { bodyParserJson, bodyParserUrlencoded } from '../middlewares/BodyParser';
import { cors } from '../middlewares/Cors';
import { contentType } from '../middlewares/ContentType';

@injectable()
export default class App implements IApp {
    private readonly _app: Application;
    private readonly _port: number;

    constructor() {
        this._app = express();
        this._port = 3000;
    }

    start(): void {
        this._app.use(bodyParserUrlencoded);
        this._app.use(bodyParserJson);
        this._app.use(cors);
        this._app.use(contentType);
        this._app.post('/', (req, res) => {
            console.log('body', req.body);
            res.json(req.body);
        });
        this._app.listen(this._port, () => {
            console.log(`Sever running at http://localhost:${this._port}`);
        });
    }
}
