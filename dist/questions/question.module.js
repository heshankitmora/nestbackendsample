"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionModule = void 0;
const common_1 = require("@nestjs/common");
const question_controller_1 = require("./question.controller");
const question_service_1 = require("./question.service");
const mongoose_1 = require("@nestjs/mongoose");
const question_schema_1 = require("./schemas/question.schema");
const questionanswers_schema_1 = require("./schemas/questionanswers.schema");
let QuestionModule = class QuestionModule {
};
QuestionModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Question', schema: question_schema_1.QuestionSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'QuestionAnswers', schema: questionanswers_schema_1.QuestionAnswersSchema }])
        ],
        controllers: [question_controller_1.QuestionController],
        providers: [question_service_1.QuestionService]
    })
], QuestionModule);
exports.QuestionModule = QuestionModule;
//# sourceMappingURL=question.module.js.map