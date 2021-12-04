import { inject, injectable } from 'inversify';
import { IUserSchema } from '../../repository/model/user/interface/IUserSchema';
import { IUserModel } from '../../application/domain/user/IUserModel';
import TYPES from '../../infra/constants/Type';
import { IUserEntity } from '../../repository/entities/user/IUserEntity';
import { IUserMapper } from '../../repository/mappers/user/interface/IUserMapper';
import { IUserRepository } from './interface/IUserRepository';

@injectable()
export class UserRepository implements IUserRepository {
    private readonly _userMapper: IUserMapper;
    private readonly _userSchema: IUserSchema.SchemaName;

    constructor(@inject(TYPES.UserMapper) userMapper: IUserMapper, @inject(TYPES.UserSchema) userSchema: IUserSchema) {
        this._userMapper = userMapper;
        this._userSchema = userSchema.getSchema();
    }

    async addNewUser(user: IUserModel): Promise<IUserEntity> {
        const data: IUserEntity = this._userMapper.mapFrom(user);
        const result = await this._userSchema.create(data);
        return this._userMapper.mapTo(result);
    }
}
