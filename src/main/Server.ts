import 'reflect-metadata';
import TYPE from '../infra/constants/Type';
import { IApp } from './config/app/interface/IApp';
import { container } from '../infra/container/Container';

const app = container.get<IApp>(TYPE.App);

const server = app.start();

app.connectMongo().then(() => {
    server.listen(process.env.PORT || 3000, () => {
        console.log(`Server started on port ${process.env.PORT}`);
    });
});
