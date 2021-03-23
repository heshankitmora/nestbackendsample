import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Question } from './interfaces/question.interface';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Questionanswers } from './interfaces/questionanswers.interface';

@Injectable()
export class QuestionService {
    constructor(
        @InjectModel('Question') private readonly questionModel: Model<Question>,
        @InjectModel('QuestionAnswers') private readonly questionAnswerModel: Model<Questionanswers>
    ) {}

    async createQuestion(createQuestonDto: CreateQuestionDto): Promise<Question> {
        const question = new this.questionModel(createQuestonDto);   
        let questionAnswersSet: Questionanswers[] = [];     

        createQuestonDto.questionanswers.forEach(answersDataSet => {
            let questionAnswers = new this.questionAnswerModel(answersDataSet);
            questionAnswers.save();
            questionAnswersSet.push(questionAnswers);
        });
        question.questionanswers = questionAnswersSet;
        await question.save();
        return question;
    }

    async getAllQuestions(): Promise<any> {
        return await this.questionModel.find({}).populate({path: "questionanswers"});
    }

    async getOneQuestion(id: string): Promise<Question> {
        return await this.questionModel.findById(id);
    }

    async updateQuestion(id: string, createQuestioDto: CreateQuestionDto): Promise<Question> {
        //return await this.questionModel.updateOne({_id: id}, createQuestioDto);
        return await null;

    }

    async deleteQuestion(id: string): Promise<Question> {
        return await this.questionModel.findByIdAndDelete(id);
    }
}