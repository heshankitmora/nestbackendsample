import { IsNotEmpty, IsString } from 'class-validator';
import { CreateQuestionanswersDto } from './create-questionanswers';

export class CreateQuestionDto {
    @IsNotEmpty()
    @IsString()
    readonly question: string;

    @IsNotEmpty()
    readonly questiontype: number;

    readonly questionanswers: [CreateQuestionanswersDto];
}