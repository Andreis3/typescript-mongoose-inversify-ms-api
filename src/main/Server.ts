import 'reflect-metadata';
import TYPE from '../infra/constants/ConstantsType';
import { IApp } from './config/IApp';
import { container } from '../infra/container/ContainerConfig';

const start = () => {
    const server = container.get<IApp>(TYPE.App);
    return server.start();
};

start();
