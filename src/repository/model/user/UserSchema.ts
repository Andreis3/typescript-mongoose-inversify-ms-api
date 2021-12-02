import { Schema, model } from 'mongoose';

export default class UserSchema {
    static getSchema() {
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
