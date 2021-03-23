import { Roles } from './../authentication/decorators/roles.decorator';
import { Request } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { Get, Post, Body, Param, Req, HttpCode, HttpStatus, Controller, Put, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { AnswerUserDto } from './dto/answer-user.dto';
import { RolesGuard } from 'src/authentication/guards/roles.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/register')
    @HttpCode(HttpStatus.CREATED)
    async userRegister(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    async login(@Req() request: Request, @Body() loginUserDto: LoginUserDto) {
        return await this.userService.login(request, loginUserDto);
    }

    @Put('/userquestionanswers/:userid')
    @HttpCode(HttpStatus.CREATED)
    async userAnswerQuestion(
        @Param() params, @Body() answerUserDto: AnswerUserDto
    ) {
        return await this.userService.userAnswerQuestion(params.userid, answerUserDto.quesitonid, answerUserDto.answerids);
    }

    @Get('/getuser/:userid')
    @HttpCode(HttpStatus.OK)
    async getAllQuestions(@Param() params) {
        return await this.userService.getUserDataById(params.userid);
    }
}

