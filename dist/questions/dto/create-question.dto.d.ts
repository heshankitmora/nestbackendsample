import { CreateQuestionanswersDto } from './create-questionanswers';
export declare class CreateQuestionDto {
    readonly question: string;
    readonly questiontype: number;
    readonly questionanswers: [CreateQuestionanswersDto];
}
