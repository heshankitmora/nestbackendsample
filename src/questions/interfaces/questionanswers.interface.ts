import { Document } from 'mongoose';

export interface Questionanswers extends Document {
    answer: string;
    answercorrect: number;
}