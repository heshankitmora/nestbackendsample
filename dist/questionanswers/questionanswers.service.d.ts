import { Model } from 'mongoose';
import { Questionanswers } from './interfaces/questionanswers.interface';
export declare class QuestionAnswersService {
    private readonly questionAnswerModel;
    constructor(questionAnswerModel: Model<Questionanswers>);
}
