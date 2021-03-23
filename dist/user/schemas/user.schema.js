"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose.Schema({
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
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'QuestionAnswers'
        }
    ]
}, {
    versionKey: false,
    timestamps: true
});
exports.UserSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashedPassword = await bcrypt.hash(this['password'], 10);
        this['password'] = hashedPassword;
        return next();
    }
    catch (err) {
        return next(err);
    }
});
//# sourceMappingURL=user.schema.js.map