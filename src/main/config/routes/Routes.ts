import { inject, injectable } from 'inversify';
import TYPES from '../../../infra/constants/Type';
import { IRegisterUser } from './user/interface/IRegisterUser';
import { IRoutes } from './interface/IRoutes';
import { Application } from 'express';

@injectable()
export class Routes implements IRoutes {
    private readonly _baseUrl: string;
    private readonly _registerUser: IRegisterUser;

    constructor(@inject(TYPES.RegisterUser) registerUser: IRegisterUser) {
        this._baseUrl = '/api';
        this._registerUser = registerUser;
    }

    public configureEndpoints(app: Application): void {
        this._registerUser.applyRoutes(this._baseUrl, app);
    }
}
