import { IsNotEmpty, MinLength, IsEmail, IsString, IsInt } from 'class-validator';

export class AnswerUserDto {

    @IsNotEmpty()
    readonly quesitonid: string;

    @IsNotEmpty()
    readonly answerids: string[];
}