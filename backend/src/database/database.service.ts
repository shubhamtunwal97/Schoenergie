import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { SurveyResponseDto } from '../survey/dto';

@Injectable()
export class DatabaseService {
  private readonly dataPath = join(process.cwd(), 'data', 'surveys.json');

  async saveSurvey(survey: SurveyResponseDto): Promise<void> {
    const surveys = await this.getAllSurveys();
    surveys.push(survey);
    await this.writeSurveys(surveys);
  }

  async getAllSurveys(): Promise<SurveyResponseDto[]> {
    try {
      await this.ensureDataDirectoryExists();
      const data = await fs.readFile(this.dataPath, 'utf8');
      const surveys = JSON.parse(data);

      // Convert submittedAt strings back to Date objects
      return surveys.map(survey => ({
        ...survey,
        submittedAt: new Date(survey.submittedAt),
      }));
    } catch (error) {
      if (error.code === 'ENOENT') {
        // File doesn't exist, return empty array
        return [];
      }
      throw error;
    }
  }

  async getSurveyById(id: string): Promise<SurveyResponseDto | null> {
    const surveys = await this.getAllSurveys();
    return surveys.find(survey => survey.id === id) || null;
  }

  async deleteSurvey(id: string): Promise<void> {
    const surveys = await this.getAllSurveys();
    const filteredSurveys = surveys.filter(survey => survey.id !== id);
    await this.writeSurveys(filteredSurveys);
  }

  private async writeSurveys(surveys: SurveyResponseDto[]): Promise<void> {
    await this.ensureDataDirectoryExists();
    await fs.writeFile(this.dataPath, JSON.stringify(surveys, null, 2), 'utf8');
  }

  private async ensureDataDirectoryExists(): Promise<void> {
    const dataDir = join(process.cwd(), 'data');
    try {
      await fs.access(dataDir);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await fs.mkdir(dataDir, { recursive: true });
      }
    }
  }
}