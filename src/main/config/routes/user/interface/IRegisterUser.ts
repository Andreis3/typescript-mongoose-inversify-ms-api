import { Application, Express } from 'express';
export interface IRegisterUser {
    applyRoutes(baseUrl: string, app: Application): void;
}
