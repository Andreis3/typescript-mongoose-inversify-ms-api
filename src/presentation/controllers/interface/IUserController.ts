import { IUserModel } from '@/application/domain/user/IUserModel';
import { IUserEntity } from '@/repository/entities/user/IUserEntity';

export interface IUserController {
    registerUser(user: IUserModel): Promise<IUserEntity>;
}
