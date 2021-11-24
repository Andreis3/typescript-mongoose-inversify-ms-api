import { Container } from 'inversify';
import App from '../../main/config/App';
import { IApp } from '../../main/config/IApp';
import TYPES from '../constants/ConstantsType';

const container = new Container();

container.bind<IApp>(TYPES.App).to(App).inSingletonScope();

export { container };
