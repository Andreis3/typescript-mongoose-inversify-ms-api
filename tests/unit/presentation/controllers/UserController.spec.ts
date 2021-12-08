import { IUserModel } from '@/application/domain/user/IUserModel';
import { UseCase } from '@/infra/base';
import { IUserEntity } from '@/repository/entities/user/IUserEntity';
import { UserController } from '@/presentation/controllers/UserController';

const makeUserEntity = (): IUserEntity => {
    const user = {
        _id: 'valid_id',
        first_name: 'valid_first_name',
        last_name: 'valid_last_name',
        email: ' valid_email@valid.com',
    };
    return user;
};

interface ISutTypes {
    sut: UserController;
    registerUseCaseStub: UseCase<IUserModel, IUserEntity>;
}

const makeSut = (): ISutTypes => {
    const registerUseCaseStub = makeRegisterUseCase();
    const sut = new UserController(registerUseCaseStub);
    return {
        sut,
        registerUseCaseStub,
    };
};

const makeRegisterUseCase = (): UseCase<IUserModel, IUserEntity> => {
    class RegisterUseCaseStub implements UseCase<IUserModel, IUserEntity> {
        async execute(data: IUserModel): Promise<IUserEntity> {
            return new Promise(resolve => resolve(makeUserEntity()));
        }
    }
    return new RegisterUseCaseStub();
};

describe('UserControllers', () => {
    describe('#registerUser', () => {
        test('Should call RegisterUseCase with correct values', async () => {
            const { sut, registerUseCaseStub } = makeSut();
            const executeSpy = jest.spyOn(registerUseCaseStub, 'execute');
            const registerUser = await sut.registerUser(makeUserEntity());
            expect(executeSpy).toHaveBeenCalledWith(makeUserEntity());
            expect(registerUser).toEqual(makeUserEntity());
        });
    });
});
