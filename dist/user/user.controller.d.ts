import { Request } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { AnswerUserDto } from './dto/answer-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    userRegister(createUserDto: CreateUserDto): Promise<import("./interfaces/user.interface").User>;
    login(request: Request, loginUserDto: LoginUserDto): Promise<{
        firstName: string;
        lastName: string;
        email: string;
        accessToken: string;
    }>;
    userAnswerQuestion(params: any, answerUserDto: AnswerUserDto): Promise<void>;
}
