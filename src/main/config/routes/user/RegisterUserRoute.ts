import { inject, injectable } from 'inversify';
import { Application, Request, Response } from 'express';
import TYPES from '../../../../infra/constants/Type';
import { IUserController } from '../../../../presentation/controllers/interface/IUserController';
import { IRegisterUserRoute } from './interface/IRegisterUser';

@injectable()
export class RegisterUserRoute implements IRegisterUserRoute {
    private _app: Application;
    private readonly _userController: IUserController;

    constructor(@inject(TYPES.UserController) userController: IUserController) {
        this._userController = userController;
    }

    public addNewUser = async (req: Request, res: Response) => {
        try {
            const result = await this._userController.registerUser(req.body);
            res.status(201).json(result);
        } catch (error) {}
    };

    public applyRoutes(baseUrl: string, app: Application): void {
        this._app = app;
        this._app.post(`${baseUrl}/register`, this.addNewUser);
    }
}
