import { inject, injectable } from 'inversify';
import TYPES from '../../infra/constants/Type';
import { IUserModel } from '../../application/domain/user/IUserModel';
import { IUserEntity } from '../../repository/entities/user/IUserEntity';
import { IUserController } from './interface/IUserController';
import { UseCase } from '../../infra/base';

@injectable()
export class UserController implements IUserController {
    private readonly _registerUseCase: UseCase<IUserModel, IUserEntity>;

    constructor(@inject(TYPES.RegisterUseCase) registerUseCase: UseCase<IUserModel, IUserEntity>) {
        this._registerUseCase = registerUseCase;
    }

    async registerUser(user: IUserModel): Promise<IUserEntity> {
        return await this._registerUseCase.execute(user);
    }
}
