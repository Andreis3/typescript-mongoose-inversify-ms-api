import { inject, injectable } from 'inversify';
import { Application, Request, Response } from 'express';
import TYPES from '../../../../infra/constants/Type';
import { IUserController } from '../../../../presentation/controllers/interface/IUserController';
import { IRegisterUserRoute } from './interface/IRegisterUser';
import { IUserModel } from '../../../../application/domain/user/IUserModel';
import { IUserEntity } from '../../../../repository/entities/user/IUserEntity';

@injectable()
export class RegisterUserRoute implements IRegisterUserRoute {
    private readonly _userController: IUserController;

    constructor(@inject(TYPES.UserController) userController: IUserController) {
        this._userController = userController;
    }

    public addNewUser = async (req: Request, res: Response): Promise<Response> => {
        try {
            const user: IUserModel = req.body;
            const userEntity: IUserEntity = await this._userController.registerUser(user);
            return res.status(201).json(userEntity);
        } catch (err) {}
    };

    public applyRoutes(baseUrl: string, app: Application): void {
        app.post(`${baseUrl}/register`, this.addNewUser);
    }
}
