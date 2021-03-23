import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import { AuthService } from './../authentication/authentication.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyUuidDto } from './dto/verify-uuid.dto';
import { Questionanswers } from 'src/questions/interfaces/questionanswers.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('QuestionAnswers') private readonly questionAnswerModel: Model<Questionanswers>,
        private readonly authService: AuthService
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = new this.userModel(createUserDto);
        await this.isEmailUnique(user.email);
        await user.save();
        const userReg = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }

        return user;
    }

    async login(req: Request, loginUserDto: LoginUserDto) {
        const user = await this.findUserByEmail(loginUserDto.email);
        const match = await bcrypt.compare(loginUserDto.password, user.password);
        if (!match) {
            throw new NotFoundException("User Not Found");
        }
        
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            accessToken: await this.authService.createAccessToken(user._id)
        };
    }

    private async findUserByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({email});
        if (!user) {
            throw new NotFoundException("Wrong Email or Password");
        }
        return user;
    }

    private async isEmailUnique(email: string) {
        const user = await this.userModel.findOne({email, verified: true});
        if (user) {
            throw new BadRequestException('Email most be unique.');
        }
    }

    async userAnswerQuestion(userid: string, questionid: string, answerids: string[]): Promise<any> {
        let user: any;
        let questionAnswersSet: any[] = [];
        answerids.forEach(answerId => {
            this.questionAnswerModel.findById(answerId).exec().then(questionAnswer => {
                let questionAnswersMod = new this.questionAnswerModel(questionAnswer);
                questionAnswersSet.push(answerId);
                this.userModel.findByIdAndUpdate(userid, {$addToSet: {'useranswers': questionAnswersMod}}).exec();
            });
        });
    
        return questionAnswersSet;
    }

    async getUserDataById(userid: string): Promise<any> {
        console.log(userid);
        const user = await this.userModel.findById(userid).populate({path: "useranswers"});
        return user;
    }
}