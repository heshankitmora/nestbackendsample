import { Model } from 'mongoose';
import { Question } from './interfaces/question.interface';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Questionanswers } from './interfaces/questionanswers.interface';
export declare class QuestionService {
    private readonly questionModel;
    private readonly questionAnswerModel;
    constructor(questionModel: Model<Question>, questionAnswerModel: Model<Questionanswers>);
    createQuestion(createQuestonDto: CreateQuestionDto): Promise<Question>;
    getAllQuestions(): Promise<any>;
    getOneQuestion(id: string): Promise<Question>;
    updateQuestion(id: string, createQuestioDto: CreateQuestionDto): Promise<Question>;
    deleteQuestion(id: string): Promise<Question>;
}
