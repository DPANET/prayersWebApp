import * as mongoose from 'mongoose';
export const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
export const userModel = mongoose.model('User', userSchema, 'User');
//# sourceMappingURL=users.model.js.map