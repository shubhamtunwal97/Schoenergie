import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateSurveyDto, SurveyResponseDto } from './dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SurveyService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createSurveyDto: CreateSurveyDto): Promise<any> {
    const recommendation = this.generateRandomRecommendation();
    const score = this.calculateScore(createSurveyDto);
    const details = this.generateDetails(createSurveyDto);

    const result = {
      recommendation: recommendation === 'Ja' ? 'Eine Solaranlage ist für Ihr Dach sehr gut geeignet!' : 'Eine Solaranlage könnte für Ihr Dach geeignet sein, aber eine genauere Prüfung ist empfehlenswert.',
      estimatedSavings: this.calculateEstimatedSavings(createSurveyDto),
      paybackPeriod: this.calculatePaybackPeriod(createSurveyDto),
      systemSize: this.calculateSystemSize(createSurveyDto),
      score: score,
      details: details
    };

    const survey: SurveyResponseDto = {
      id: uuidv4(),
      ...createSurveyDto,
      recommendation,
      submittedAt: new Date(),
    };

    await this.databaseService.saveSurvey(survey);
    return result;
  }

  async findAll(): Promise<SurveyResponseDto[]> {
    return this.databaseService.getAllSurveys();
  }

  async findOne(id: string): Promise<SurveyResponseDto> {
    const survey = await this.databaseService.getSurveyById(id);
    if (!survey) {
      throw new NotFoundException(`Survey with ID ${id} not found`);
    }
    return survey;
  }

  async remove(id: string): Promise<void> {
    const survey = await this.databaseService.getSurveyById(id);
    if (!survey) {
      throw new NotFoundException(`Survey with ID ${id} not found`);
    }
    await this.databaseService.deleteSurvey(id);
  }

  private generateRandomRecommendation(): 'Ja' | 'Nein' {
    return Math.random() > 0.5 ? 'Ja' : 'Nein';
  }

  private calculateScore(data: CreateSurveyDto): number {
    let score = 0;

    // Property type scoring
    if (data.propertyType === 'Einfamilienhaus') score += 30;
    else if (data.propertyType === 'Mehrfamilienhaus') score += 25;
    else score += 20;

    // Roof orientation scoring
    if (data.roofOrientation.includes('Süd')) score += 25;
    if (data.roofOrientation.includes('West') || data.roofOrientation.includes('Ost')) score += 15;

    // Roof age scoring
    if (data.roofAge === 'Unter 5 Jahre') score += 20;
    else if (data.roofAge === '5–15 Jahre') score += 15;
    else if (data.roofAge === 'Über 15 Jahre') score += 5;

    // Consumption scoring
    if (data.electricityConsumption === 'Über 5.000 kWh') score += 20;
    else if (data.electricityConsumption === '3.000–5.000 kWh') score += 15;
    else score += 10;

    return Math.min(100, score);
  }

  private calculateEstimatedSavings(data: CreateSurveyDto): number {
    let base = 800;
    if (data.electricityConsumption === 'Über 5.000 kWh') base = 1500;
    else if (data.electricityConsumption === '3.000–5.000 kWh') base = 1200;

    return base + Math.random() * 300;
  }

  private calculatePaybackPeriod(data: CreateSurveyDto): number {
    let years = 12;
    if (data.roofOrientation.includes('Süd')) years -= 2;
    if (data.propertyType === 'Einfamilienhaus') years -= 1;

    return Math.max(8, years + Math.random() * 2 - 1);
  }

  private calculateSystemSize(data: CreateSurveyDto): number {
    let size = 6;
    if (data.electricityConsumption === 'Über 5.000 kWh') size = 10;
    else if (data.electricityConsumption === '3.000–5.000 kWh') size = 8;

    return size + Math.random() * 2;
  }

  private generateDetails(data: CreateSurveyDto): any {
    const propertyScore = data.propertyType === 'Einfamilienhaus' ? 85 : 70;
    const roofScore = data.roofOrientation.includes('Süd') ? 90 : 65;
    const ageScore = data.roofAge === 'Unter 5 Jahre' ? 95 : 75;
    const consumptionScore = data.electricityConsumption === 'Über 5.000 kWh' ? 85 : 70;

    const avgScore = (propertyScore + roofScore + ageScore + consumptionScore) / 4;
    let rating = 'Schlecht';
    if (avgScore >= 80) rating = 'Sehr gut';
    else if (avgScore >= 70) rating = 'Gut';
    else if (avgScore >= 60) rating = 'Mäßig';

    return {
      propertyTypeScore: propertyScore,
      roofOrientationScore: roofScore,
      roofAgeScore: ageScore,
      consumptionScore: consumptionScore,
      suitabilityRating: rating
    };
  }
}