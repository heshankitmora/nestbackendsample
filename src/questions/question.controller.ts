import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';

import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { RolesGuard } from 'src/authentication/guards/roles.guard';

@Controller('question')
export class QuestionController {

    constructor(
        private readonly questionService: QuestionService
    ) {}

    @Get('/getall')
    @HttpCode(HttpStatus.OK)
    async getAllQuestions() {
        return await this.questionService.getAllQuestions();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getOneQuestion(@Param() params) {
        return await this.questionService.getOneQuestion(params.id);
    }

    @Post('/addquestion')
    @HttpCode(HttpStatus.OK)
    @UseGuards(RolesGuard)
    async createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
        return await this.questionService.createQuestion(createQuestionDto);
    }

    @Put('/updatequestion/:id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(RolesGuard)
    async updateQuestion(
        @Param() params, 
        @Body() createQuestionDto: CreateQuestionDto
    ) {
        return await this.questionService.updateQuestion(params.id, createQuestionDto);
    }

}