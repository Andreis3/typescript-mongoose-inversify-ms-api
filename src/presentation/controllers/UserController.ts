import { inject, injectable } from 'inversify';
import TYPES from '../../infra/constants/Type';
import { IUserService } from '../../application/services/user/interface/IUserService';
import { IUserModel } from '../../application/domain/user/IUserModel';
import { IUserEntity } from '../../repository/entities/user/IUserEntity';
import { IUserController } from './interface/IUserController';

@injectable()
export class UserController implements IUserController {
    private readonly _userService: IUserService;

    constructor(@inject(TYPES.UserService) userService: IUserService) {
        this._userService = userService;
    }

    async registerUser(user: IUserModel): Promise<IUserEntity> {
        return await this._userService.addNewUser(user);
    }
}
