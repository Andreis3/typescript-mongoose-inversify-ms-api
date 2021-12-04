import { Model } from 'mongoose';

export interface IUserSchema {
    getSchema(): IUserSchema.SchemaName;
}

export namespace IUserSchema {
    export type SchemaName = typeof Model;
}
