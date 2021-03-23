import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Schema } from 'mongoose';

export const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'FIRST_NAME_BLANK']
    },
    lastName: {
        type: String,
        required: [true, 'LAST_NAME_BLANK']
    },
    email: {
        type: String,
        lowercase: true,
        minlength: 4,
        required: [true, 'EMAIL_IS_BLANK']
    },
    password: {
        type: String,
        minlength: 4,
        required: [true, 'PASSWORD_REQUIRED']
    },
    roles: {
        type: [String],
        default: ['user']
    },
    useranswers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'QuestionAnswers'
        }
    ]
}, {
    versionKey: false,
    timestamps: true
});

UserSchema.pre('save', async function(next: mongoose.HookNextFunction) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashedPassword = await bcrypt.hash(this['password'], 10);
        this['password'] = hashedPassword;
        return next();
    } catch (err) {
        return next(err);
    }
});