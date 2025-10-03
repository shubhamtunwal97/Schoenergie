import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { SurveyService } from './survey.service';
import { CreateSurveyDto, SurveyResponseDto } from './dto';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post('submit')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createSurveyDto: CreateSurveyDto): Promise<SurveyResponseDto> {
    return this.surveyService.create(createSurveyDto);
  }

  @Get()
  async findAll(): Promise<SurveyResponseDto[]> {
    return this.surveyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SurveyResponseDto> {
    return this.surveyService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.surveyService.remove(id);
  }
}