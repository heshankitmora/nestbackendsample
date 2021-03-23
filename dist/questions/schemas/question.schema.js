"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionSchema = void 0;
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
exports.QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'QUESTION_BLANK']
    },
    questionanswers: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'QuestionAnswers'
        }
    ]
}, {
    versionKey: false,
    timestamps: true
});
//# sourceMappingURL=question.schema.js.map