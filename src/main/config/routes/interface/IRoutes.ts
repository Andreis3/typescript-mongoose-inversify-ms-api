import { Application } from 'express';

export interface IRoutes {
    configureEndpoints(app: Application): void;
}
