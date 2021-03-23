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

    async userAnswerQuestion(userid: string, questionid: string, answerids: string[]) {
        //const user = await this.userModel.findById(userid);
        /*console.log(userid);
        
        this.userModel.findById(userid).exec().then(userData => {
            

            console.log("123");
            console.log(userData);
            console.log(userData.$getAllSubdocs);
            console.log("123");

            

            //console.log(questionAnswersSet);
            return userData;
        
        });*/
        let questionAnswersSet: Questionanswers[] = [];
        answerids.forEach(answerId => {
            this.questionAnswerModel.findById(answerId).exec().then(questionAnswer => {
                //console.log(questionAnswer);
                let questionAnswersMod = new this.questionAnswerModel(questionAnswer);
                questionAnswersSet.push(questionAnswersMod);

               /* this.userModel.find({"useranswers.id": questionAnswersMod}).exec().then(selectedData => {
                    console.log("123");
                    console.log(selectedData);
                    console.log("123");
                });*/
                this.userModel.findByIdAndUpdate(userid, {$addToSet: {'useranswers': questionAnswersMod}}).then(updatedData => {
                    
                    return updatedData;
                    
                });

            });
        });
    
        //return user;
        //let questionAnswerList = 
        //user.update
    }
}