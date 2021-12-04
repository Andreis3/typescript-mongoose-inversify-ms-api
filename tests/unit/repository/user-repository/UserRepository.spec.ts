import { Model } from 'mongoose';
import { IUserModel } from '../../../../src/application/domain/user/IUserModel';
import { IUserEntity } from '../../../../src/repository/entities/user/IUserEntity';
import { IUserMapper } from '../../../../src/repository/mappers/user/interface/IUserMapper';
import { IUserSchema } from '../../../../src/repository/model/user/interface/IUserSchema';
import { UserRepository } from '../../../../src/repository/user-repository/UserRepository';

const makeUserSchemaFake = (): IUserSchema.SchemaName => {
    const UserSchema = Model;
    return UserSchema;
};

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
    sut: UserRepository;
    userMapperStub: IUserMapper;
    userSchemaStub: IUserSchema;
}

const makeSut = (): ISutTypes => {
    const userMapperStub = makeUserMapper();
    const userSchemaStub = makeUserSchema();
    const sut = new UserRepository(userMapperStub, userSchemaStub);
    return {
        sut,
        userMapperStub,
        userSchemaStub,
    };
};

const makeUserMapper = (): IUserMapper => {
    class UserMapperStub implements IUserMapper {
        mapFrom(param: IUserModel): IUserEntity {
            return makeUserEntity();
        }

        mapTo(output: IUserModel): IUserEntity {
            return makeUserEntity();
        }
    }
    return new UserMapperStub();
};

const makeUserSchema = (): IUserSchema => {
    class UserSchemaStub implements IUserSchema {
        getSchema(): IUserSchema.SchemaName {
            return makeUserSchemaFake();
        }
    }
    return new UserSchemaStub();
};

describe('UserRepository', () => {
    describe('#addNewUser', () => {
        test.only('Should call RegisterUseCase with correct values', async () => {
            const { sut, userMapperStub, userSchemaStub } = makeSut();
            userSchemaStub.getSchema().create = jest.fn().mockReturnValueOnce(Promise.resolve(makeUserEntity()));
            const mapToSpy = jest.spyOn(userMapperStub, 'mapTo');
            const mapFromSpy = jest.spyOn(userMapperStub, 'mapFrom');
            const createSpy = jest.spyOn(userSchemaStub.getSchema(), 'create').mockReturnValueOnce();
            const addNewUser = await sut.addNewUser(makeUserEntity());

            expect(createSpy).toHaveBeenCalledWith(makeUserEntity());
            expect(mapFromSpy).toHaveBeenCalledWith(makeUserEntity());
            expect(mapToSpy).toHaveBeenCalledWith(makeUserEntity());
            expect(addNewUser).toEqual(makeUserEntity());
        });
    });
});
