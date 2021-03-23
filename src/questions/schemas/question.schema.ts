import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'QUESTION_BLANK']
    },
    questiontype: {
        type: Number
    },
    questionanswers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'QuestionAnswers'
        }
    ]
}, {
    versionKey: false,
    timestamps: true
});