import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionanswersDto {
    @IsNotEmpty()
    @IsString()
    readonly answer: string;
}