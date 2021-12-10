import { inject, injectable } from 'inversify';
import { IUserModel } from '@/application/domain/user/IUserModel';
import { UseCase } from '@/infra/base';
import TYPES from '@/infra/constants/Type';
import { IUserService } from '@/application/services/user/interface/IUserService';
import { IUserEntity } from '@/repository/entities/user/IUserEntity';

@injectable()
export class RegisterUseCase implements UseCase<IUserModel, IUserEntity> {
    private readonly _userService: IUserService;
    constructor(@inject(TYPES.UserService) userService: IUserService) {
        this._userService = userService;
    }

    async execute(request: IUserModel): Promise<IUserEntity> {
        return await this._userService.addNewUser(request);
    }
}
