import 'reflect-metadata';
import TYPE from '../infra/constants/Type';
import { IApp } from './config/app/interface/IApp';
import { container } from '../infra/container/Container';

const start = () => {
    const server = container.get<IApp>(TYPE.App);
    return server.start();
};

start();
