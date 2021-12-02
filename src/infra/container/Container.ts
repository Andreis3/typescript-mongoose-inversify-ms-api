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
import { IRegisterUser } from '../../main/config/routes/user/interface/IRegisterUser';
import { RegisterUser } from '../../main/config/routes/user/RegisterUser';
import { Routes } from '../../main/config/routes/Routes';
import { IRoutes } from '../../main/config/routes/interface/IRoutes';

const container = new Container();

container.bind<IApp>(TYPES.App).to(App).inSingletonScope();
container.bind<IMongoDbConnect>(TYPES.MongoDbConnect).to(MongoDbConnect).inSingletonScope();
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();
container.bind<IUserMapper>(TYPES.UserMapper).to(UserMapper).inTransientScope();
container.bind<IUserService>(TYPES.UserService).to(UserRepository).inTransientScope();
container.bind<IUserController>(TYPES.UserController).to(UserController).inTransientScope();
container.bind<IRegisterUser>(TYPES.RegisterUser).to(RegisterUser).inTransientScope();
container.bind<IRoutes>(TYPES.Routes).to(Routes).inTransientScope();

export { container };
