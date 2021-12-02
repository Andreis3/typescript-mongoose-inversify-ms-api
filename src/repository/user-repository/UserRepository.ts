import { inject, injectable } from 'inversify';
import { IUserModel } from '../../application/domain/user/IUserModel';
import TYPES from '../../infra/constants/Type';
import { IUserEntity } from '../../repository/entities/user/IUserEntity';
import { IUserMapper } from '../../repository/mappers/user/interface/IUserMapper';
import { IUserRepository } from './interface/IUserRepository';
import UserSchema from '../model/user/UserSchema';

@injectable()
export class UserRepository implements IUserRepository {
    private readonly _userMapper: IUserMapper;
    private readonly _userModel;

    constructor(@inject(TYPES.UserMapper) userMapper: IUserMapper) {
        this._userMapper = userMapper;
        this._userModel = UserSchema.getSchema();
    }

    async addNewUser(user: IUserModel): Promise<IUserEntity> {
        const data: IUserEntity = this._userMapper.mapFrom(user);
        const result = await new this._userModel(data).save();
        return this._userMapper.mapTo(result);
    }
}
