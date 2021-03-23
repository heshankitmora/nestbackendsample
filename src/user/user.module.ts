import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from 'src/authentication/authentication.module';
import { QuestionAnswersSchema } from 'src/questions/schemas/questionanswers.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
        MongooseModule.forFeature([{name: 'QuestionAnswers', schema: QuestionAnswersSchema}]),
        AuthModule
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}