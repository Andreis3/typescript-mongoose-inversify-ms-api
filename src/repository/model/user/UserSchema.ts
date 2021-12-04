import { injectable } from 'inversify';
import { Schema, model } from 'mongoose';
import { IUserSchema } from './interface/IUserSchema';

@injectable()
export class UserSchema implements IUserSchema {
    getSchema() {
        const userSchema = new Schema({
            email: {
                type: String,
                required: true,
            },
            first_name: {
                type: String,
                required: true,
            },
            last_name: {
                type: String,
                required: true,
            },
        });
        const UserModel = model('User', userSchema);

        return UserModel;
    }
}
