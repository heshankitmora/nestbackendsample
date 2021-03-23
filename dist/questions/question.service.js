"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let QuestionService = class QuestionService {
    constructor(questionModel, questionAnswerModel) {
        this.questionModel = questionModel;
        this.questionAnswerModel = questionAnswerModel;
    }
    async createQuestion(createQuestonDto) {
        const question = new this.questionModel(createQuestonDto);
        let questionAnswersSet = [];
        createQuestonDto.questionanswers.forEach(answersDataSet => {
            let questionAnswers = new this.questionAnswerModel(answersDataSet);
            questionAnswers.save();
            questionAnswersSet.push(questionAnswers);
        });
        question.questionanswers = questionAnswersSet;
        await question.save();
        return question;
    }
    async getAllQuestions() {
        return await this.questionModel.find({}).populate({ path: "questionanswers" });
    }
    async getOneQuestion(id) {
        return await this.questionModel.findById(id);
    }
    async updateQuestion(id, createQuestioDto) {
        return await null;
    }
    async deleteQuestion(id) {
        return await this.questionModel.findByIdAndDelete(id);
    }
};
QuestionService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Question')),
    __param(1, mongoose_1.InjectModel('QuestionAnswers')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], QuestionService);
exports.QuestionService = QuestionService;
//# sourceMappingURL=question.service.js.map