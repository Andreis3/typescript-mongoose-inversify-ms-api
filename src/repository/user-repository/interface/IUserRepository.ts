import { IUserModel } from 'application/domain/user/IUserModel';
import { IUserEntity } from 'repository/entities/user/IUserEntity';

export interface IUserRepository {
    addNewUser(user: IUserModel): Promise<IUserEntity>;
}
