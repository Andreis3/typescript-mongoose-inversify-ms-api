import { Container } from 'inversify';
import App from '../../main/config/app/App';
import TYPES from '../constants/Type';
import { IApp } from '../../main/config/app/interface/IApp';
import IMongoDbConnect from 'infra/config/database/interface/IMongoDbConnect';
import MongoDbConnect from '../config/database/MongoDbConnect';
import { UserMapper } from '../../repository/mappers/user/UserMapper';
import { IUserMapper } from '../../repository/mappers/user/interface/IUserMapper';
import { IUserRepository } from '../../repository/user-repository/interface/IUserRepository';
import { UserRepository } from '../../repository/user-repository/UserRepository';
import { IUserService } from '../../application/services/user/interface/IUserService';
import { IUserController } from '../../presentation/controllers/interface/IUserController';
import { UserController } from '../../presentation/controllers/UserController';
import { IRegisterUserRoute } from '../../main/config/routes/user/interface/IRegisterUser';
import { RegisterUserRoute } from '../../main/config/routes/user/RegisterUserRoute';
import { Routes } from '../../main/config/routes/Routes';
import { IRoutes } from '../../main/config/routes/interface/IRoutes';
import { RegisterUseCase } from '../../application/use-case/RegisterUseCase';
import { UseCase } from '../../infra/base';
import { IUserModel } from '../../application/domain/user/IUserModel';
import { IUserEntity } from '../../repository/entities/user/IUserEntity';
import { UserSchema } from '../../repository/model/user/UserSchema';
import { IUserSchema } from 'repository/model/user/interface/IUserSchema';

const container = new Container();

container.bind<IApp>(TYPES.App).to(App).inSingletonScope();
container.bind<IMongoDbConnect>(TYPES.MongoDbConnect).to(MongoDbConnect).inSingletonScope();
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();
container.bind<IUserMapper>(TYPES.UserMapper).to(UserMapper).inTransientScope();
container.bind<IUserSchema>(TYPES.UserSchema).to(UserSchema).inTransientScope();
container.bind<IUserService>(TYPES.UserService).to(UserRepository).inTransientScope();
container.bind<IUserController>(TYPES.UserController).to(UserController).inTransientScope();
container.bind<IRegisterUserRoute>(TYPES.RegisterUserRoute).to(RegisterUserRoute).inTransientScope();
container.bind<IRoutes>(TYPES.Routes).to(Routes).inTransientScope();
container.bind<UseCase<IUserModel, IUserEntity>>(TYPES.RegisterUseCase).to(RegisterUseCase).inTransientScope();

export { container };
