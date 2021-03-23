"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionAnswersSchema = void 0;
const mongoose = require("mongoose");
exports.QuestionAnswersSchema = new mongoose.Schema({
    answer: {
        type: String,
        required: [true, 'QUESTION_ANSWER_BLANK']
    }
}, {
    versionKey: false,
    timestamps: true
});
//# sourceMappingURL=questionanswers.schema.js.map