import { Document } from 'mongoose';
import { Questionanswers } from 'src/questions/interfaces/questionanswers.interface';

export interface User extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles: [string];
    accessToken: string;
    useranswers: Questionanswers[]
}