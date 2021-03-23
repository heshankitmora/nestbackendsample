import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const QuestionAnswersSchema = new mongoose.Schema({
    answer: {
        type: String,
        required: [true, 'QUESTION_ANSWER_BLANK']
    },
    answercorrect: {
        type: Number
    }
}, {
    versionKey: false,
    timestamps: true
});