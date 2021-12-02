import { injectable } from 'inversify';
import { IUserModel } from '../../../application/domain/user/IUserModel';
import { Mapper } from '../../../infra/base';
import { IUserEntity } from '../../../repository/entities/user/IUserEntity';
import { IUserMapper } from './interface/IUserMapper';

@injectable()
export class UserMapper extends Mapper<IUserModel, IUserEntity> implements IUserMapper {
    mapFrom(param: IUserModel): IUserEntity {
        return {
            _id: param._id,
            email: param.email,
            first_name: param.first_name,
            last_name: param.last_name,
        };
    }

    mapTo(output: IUserModel): IUserEntity {
        return {
            _id: output._id,
            email: output.email,
            first_name: output.first_name,
            last_name: output.last_name,
        };
    }
}
