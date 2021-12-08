import { IUserModel } from '@/application/domain/user/IUserModel';
import { UserService } from '@/application/services/user/UserService';
import { IUserEntity } from '@/repository/entities/user/IUserEntity';
import { IUserRepository } from '@/repository/user-repository/interface/IUserRepository';

const makeUserEntity = (): IUserEntity => {
    const user = {
        _id: 'valid_id',
        first_name: 'valid_first_name',
        last_name: 'valid_last_name',
        email: ' valid_email@valid.com',
    };
    return user;
};

const makeUserModel = (): IUserModel => {
    const user = {
        first_name: 'valid_first_name',
        last_name: 'valid_last_name',
        email: ' valid_email@valid.com',
    };
    return user;
};

interface ISutTypes {
    sut: UserService;
    userRepositoryStub: IUserRepository;
}

const makeSut = (): ISutTypes => {
    const userRepositoryStub = makeUserRepositoryStub();
    const sut = new UserService(userRepositoryStub);
    return {
        sut,
        userRepositoryStub,
    };
};

const makeUserRepositoryStub = (): IUserRepository => {
    class UserRepositoryStub implements IUserRepository {
        async addNewUser(user: IUserModel): Promise<IUserEntity> {
            return new Promise(resolve => resolve(makeUserEntity()));
        }
    }
    return new UserRepositoryStub();
};

describe('UserControllers', () => {
    describe('#registerUser', () => {
        test('Should call RegisterUseCase with correct values', async () => {
            const { sut, userRepositoryStub } = makeSut();
            const addNewUserSpy = jest.spyOn(userRepositoryStub, 'addNewUser');
            const newUser = await sut.addNewUser(makeUserModel());

            expect(addNewUserSpy).toHaveBeenCalledWith(makeUserModel());
            expect(newUser).toEqual(makeUserEntity());
        });
    });
});
