import { inject, injectable } from 'inversify';
import { Application } from 'express';
import TYPES from '@/infra/constants/Type';
import { IRegisterUserRoute } from '@/main/config/routes/user/interface/IRegisterUserRoute';
import { IRoutes } from '@/main/config/routes/interface/IRoutes';

@injectable()
export class Routes implements IRoutes {
    private readonly _baseUrl: string;
    private readonly _registerUserRoute: IRegisterUserRoute;

    constructor(@inject(TYPES.RegisterUserRoute) registerUserRoute: IRegisterUserRoute) {
        this._baseUrl = '/api';
        this._registerUserRoute = registerUserRoute;
    }

    public configureEndpoints(app: Application): void {
        this._registerUserRoute.applyRoutes(this._baseUrl, app);
    }
}
