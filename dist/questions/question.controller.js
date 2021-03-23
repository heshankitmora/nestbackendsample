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
exports.QuestionController = void 0;
const common_1 = require("@nestjs/common");
const question_service_1 = require("./question.service");
const create_question_dto_1 = require("./dto/create-question.dto");
const roles_guard_1 = require("../authentication/guards/roles.guard");
let QuestionController = class QuestionController {
    constructor(questionService) {
        this.questionService = questionService;
    }
    async getAllQuestions() {
        return await this.questionService.getAllQuestions();
    }
    async getOneQuestion(params) {
        return await this.questionService.getOneQuestion(params.id);
    }
    async createQuestion(createQuestionDto) {
        return await this.questionService.createQuestion(createQuestionDto);
    }
    async updateQuestion(params, createQuestionDto) {
        return await this.questionService.updateQuestion(params.id, createQuestionDto);
    }
};
__decorate([
    common_1.Get('/getall'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "getAllQuestions", null);
__decorate([
    common_1.Get(':id'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "getOneQuestion", null);
__decorate([
    common_1.Post('/addquestion'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_question_dto_1.CreateQuestionDto]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "createQuestion", null);
__decorate([
    common_1.Put('/updatequestion/:id'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_question_dto_1.CreateQuestionDto]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "updateQuestion", null);
QuestionController = __decorate([
    common_1.Controller('question'),
    __metadata("design:paramtypes", [question_service_1.QuestionService])
], QuestionController);
exports.QuestionController = QuestionController;
//# sourceMappingURL=question.controller.js.map