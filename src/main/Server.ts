import 'reflect-metadata';
import 'module-alias/register';
import TYPE from '@/infra/constants/Type';
import { IApp } from '@/main/config/app/interface/IApp';
import { container } from '@/infra/container/Container';
import Env from '@/main/config/app/Env';

const app = container.get<IApp>(TYPE.App);

const server = app.start();

app.connectMongo().then(() => {
    server.listen(Env.port || 3000, () => {
        console.log(`Server started on port ${Env.port}`);
    });
});
