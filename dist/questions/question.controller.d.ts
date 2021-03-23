import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    getAllQuestions(): Promise<any>;
    getOneQuestion(params: any): Promise<import("./interfaces/question.interface").Question>;
    createQuestion(createQuestionDto: CreateQuestionDto): Promise<import("./interfaces/question.interface").Question>;
    updateQuestion(params: any, createQuestionDto: CreateQuestionDto): Promise<import("./interfaces/question.interface").Question>;
}
