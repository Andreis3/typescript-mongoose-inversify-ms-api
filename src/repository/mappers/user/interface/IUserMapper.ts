import { IUserModel } from '@/application/domain/user/IUserModel';
import { IUserEntity } from '@/repository/entities/user/IUserEntity';

export interface IUserMapper {
    mapFrom(param: IUserModel): IUserEntity;
    mapTo(output: IUserModel): IUserEntity;
}
