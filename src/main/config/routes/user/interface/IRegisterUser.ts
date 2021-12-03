import { Application } from 'express';
export interface IRegisterUserRoute {
    applyRoutes(baseUrl: string, app: Application): void;
}
