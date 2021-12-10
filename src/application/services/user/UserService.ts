import { inject, injectable } from 'inversify';
import { IUserModel } from 'application/domain/user/IUserModel';
import TYPES from '@/infra/constants/Type';
import { IUserEntity } from '@/repository/entities/user/IUserEntity';
import { IUserRepository } from '@/repository/user-repository/interface/IUserRepository';
import { IUserService } from '@/application/services/user/interface/IUserService';

@injectable()
export class UserService implements IUserService {
    private readonly _userRepository: IUserRepository;
    constructor(@inject(TYPES.UserRepository) userRepository: IUserRepository) {
        this._userRepository = userRepository;
    }

    async addNewUser(user: IUserModel): Promise<IUserEntity> {
        const newUser = await this._userRepository.addNewUser(user);
        return newUser;
    }
}
