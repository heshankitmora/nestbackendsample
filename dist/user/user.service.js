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
exports.UserService = void 0;
const bcrypt = require("bcrypt");
const authentication_service_1 = require("./../authentication/authentication.service");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const questionanswers_interface_1 = require("../questions/interfaces/questionanswers.interface");
let UserService = class UserService {
    constructor(userModel, questionAnswerModel, authService) {
        this.userModel = userModel;
        this.questionAnswerModel = questionAnswerModel;
        this.authService = authService;
    }
    async create(createUserDto) {
        const user = new this.userModel(createUserDto);
        await this.isEmailUnique(user.email);
        await user.save();
        const userReg = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        };
        return user;
    }
    async login(req, loginUserDto) {
        const user = await this.findUserByEmail(loginUserDto.email);
        const match = await bcrypt.compare(loginUserDto.password, user.password);
        if (!match) {
            throw new common_1.NotFoundException("User Not Found");
        }
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            accessToken: await this.authService.createAccessToken(user._id)
        };
    }
    async findUserByEmail(email) {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.NotFoundException("Wrong Email or Password");
        }
        return user;
    }
    async isEmailUnique(email) {
        const user = await this.userModel.findOne({ email, verified: true });
        if (user) {
            throw new common_1.BadRequestException('Email most be unique.');
        }
    }
    async userAnswerQuestion(userid, questionid, answerids) {
        console.log(userid);
        this.userModel.findById(userid).exec().then(userData => {
            let questionAnswersSet = [];
            console.log("123");
            console.log(userData);
            console.log(userData.useranswers);
            console.log("123");
            answerids.forEach(answerId => {
                this.questionAnswerModel.findById(answerId).exec().then(questionAnswer => {
                    console.log(questionAnswer);
                    let questionAnswersMod = new this.questionAnswerModel(questionAnswer);
                    questionAnswersSet.push(questionAnswersMod);
                });
            });
            console.log(questionAnswersSet);
            return userData;
        });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('User')),
    __param(1, mongoose_1.InjectModel('QuestionAnswers')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        authentication_service_1.AuthService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map