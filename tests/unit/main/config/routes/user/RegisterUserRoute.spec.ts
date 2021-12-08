import { IUserModel } from '@/application/domain/user/IUserModel';
import { RegisterUserRoute } from '@/main/config/routes/user/RegisterUserRoute';
import { IUserController } from '@/presentation/controllers/interface/IUserController';
import { IUserEntity } from '@/repository/entities/user/IUserEntity';

const baseUrl = '/api';

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
    sut: RegisterUserRoute;
    userControllerStub: IUserController;
}

const makeSut = (): ISutTypes => {
    const userControllerStub = makeUserController();
    const sut = new RegisterUserRoute(userControllerStub);
    return {
        sut,
        userControllerStub,
    };
};

const makeUserController = (): IUserController => {
    class UserControllerStub implements IUserController {
        async registerUser(user: IUserModel): Promise<IUserEntity> {
            return new Promise(resolve => resolve(makeUserEntity()));
        }
    }
    return new UserControllerStub();
};

describe('RegisterUserRoute', () => {
    describe('#applyRoutes', () => {
        let mockApp;
        beforeEach(() => {
            mockApp = {
                post: () => ({}),
            };
        });
        test('Should call RegisterUserRoute with correct values', async () => {
            const { sut } = makeSut();
            const applyRoutesSpy = jest.spyOn(sut, 'applyRoutes');
            sut.applyRoutes(baseUrl, mockApp);
            expect(applyRoutesSpy).toHaveBeenCalledWith(baseUrl, mockApp);
        });
    });

    describe('#addNewUser', () => {
        let mockRequest;
        let mockResponse;
        beforeEach(() => {
            mockRequest = {
                body: makeUserModel(),
            };
            mockResponse = {
                status: () => ({
                    json: () => ({ ...makeUserEntity() }),
                }),
            };
        });
        test('Should call RegisterUserRoute with correct values', async () => {
            const { sut, userControllerStub } = makeSut();
            const registerUserSpy = await jest.spyOn(userControllerStub, 'registerUser');
            const addNewUserSpy = await jest.spyOn(sut, 'addNewUser');
            const result = await sut.addNewUser(mockRequest, mockResponse);

            expect(registerUserSpy).toHaveBeenCalledWith(makeUserModel());
            expect(addNewUserSpy).toHaveBeenCalledWith(mockRequest, mockResponse);
            expect(result).toEqual(makeUserEntity());
        });
    });
});
