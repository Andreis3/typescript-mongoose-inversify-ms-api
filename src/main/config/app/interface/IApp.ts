import { Express } from 'express';

export interface IApp {
    start(): Express;
    connectMongo(): Promise<void>;
}
