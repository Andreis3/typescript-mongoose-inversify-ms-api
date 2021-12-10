import { IUserModel } from '@/application/domain/user/IUserModel';
import { IUserEntity } from '@/repository/entities/user/IUserEntity';

export interface IUserService {
    addNewUser(user: IUserModel): Promise<IUserEntity>;
}
