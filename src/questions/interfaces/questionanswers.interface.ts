import { Document } from 'mongoose';
import { Question } from './question.interface';

export interface Questionanswers extends Document {
    answer: string;
    answercorrect: number;
    questionanswers: Question;
}