import { Document } from 'mongoose';
import { Questionanswers } from './questionanswers.interface';
export interface Question extends Document {
    question: string;
    questiontype: number;
    questionanswers: Questionanswers[];
}
