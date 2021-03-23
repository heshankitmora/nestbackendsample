import { Request } from 'express';
import { AuthService } from './../authentication/authentication.service';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { Questionanswers } from 'src/questions/interfaces/questionanswers.interface';
export declare class UserService {
    private readonly userModel;
    private readonly questionAnswerModel;
    private readonly authService;
    constructor(userModel: Model<User>, questionAnswerModel: Model<Questionanswers>, authService: AuthService);
    create(createUserDto: CreateUserDto): Promise<User>;
    login(req: Request, loginUserDto: LoginUserDto): Promise<{
        firstName: string;
        lastName: string;
        email: string;
        accessToken: string;
    }>;
    private findUserByEmail;
    private isEmailUnique;
    userAnswerQuestion(userid: string, questionid: string, answerids: string[]): Promise<void>;
}
