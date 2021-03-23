import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';

import { MongooseModule } from '@nestjs/mongoose';
import { QuestionSchema } from './schemas/question.schema';
import { QuestionAnswersSchema } from './schemas/questionanswers.schema';

@Module({
    imports: [
      MongooseModule.forFeature([{name: 'Question', schema: QuestionSchema}]),
      MongooseModule.forFeature([{name: 'QuestionAnswers', schema: QuestionAnswersSchema}])
    ],
    controllers: [QuestionController],
    providers: [QuestionService]
  })
  export class QuestionModule {}