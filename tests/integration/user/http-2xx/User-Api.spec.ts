import request from 'supertest';
import { Express } from 'express';
import Type from '@/infra/constants/Type';
import { container } from '@/infra/container/Container';
import { IApp } from '@/main/config/app/interface/IApp';
import MongoHelper from '@/infra/config/database/MongoDbConnect';

const mongo = new MongoHelper();
const server: Express = container.get<IApp>(Type.App).start();

describe('User Routes', () => {
    beforeAll(async () => {
        await mongo.connect();
    });
    afterAll(async () => {
        await mongo.disconnect();
    });

    describe('POST /user', () => {
        test('Should return 201 on user', async () => {
            const result = await request(server).post('/api/register').send({
                first_name: 'Andrei',
                last_name: 'Santos',
                email: 'andrei.santos@test.com.br',
            });

            expect(result.status).toBe(201);
            expect(result.body.first_name).toBe('Andrei');
        });
    });
});
