import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PropertyType, RoofOrientation, RoofAge, ElectricityConsumption, InterestedInOtherSolutions } from '../src/survey/dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }));
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/api/survey (POST)', () => {
    it('should create a survey successfully', () => {
      const createSurveyDto = {
        propertyType: PropertyType.EINFAMILIENHAUS,
        roofOrientation: [RoofOrientation.SUED, RoofOrientation.WEST],
        roofAge: RoofAge.UNTER_5_JAHRE,
        electricityConsumption: ElectricityConsumption.ZWISCHEN_3000_5000_KWH,
        interestedInOtherSolutions: InterestedInOtherSolutions.JA,
        contactInfo: {
          name: 'Test User',
          email: 'test@example.com',
          phone: '+49123456789',
        },
      };

      return request(app.getHttpServer())
        .post('/api/survey/submit')
        .send(createSurveyDto)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body).toHaveProperty('submittedAt');
          expect(res.body.recommendation).toMatch(/^(Ja|Nein)$/);
          expect(res.body.propertyType).toBe(createSurveyDto.propertyType);
          expect(res.body.roofOrientation).toEqual(createSurveyDto.roofOrientation);
        });
    });

    it('should validate required fields', () => {
      const invalidDto = {
        // Missing required fields
        roofOrientation: [RoofOrientation.SUED],
      };

      return request(app.getHttpServer())
        .post('/api/survey/submit')
        .send(invalidDto)
        .expect(400);
    });

    it('should validate enum values', () => {
      const invalidDto = {
        propertyType: 'InvalidType',
        roofOrientation: ['InvalidOrientation'],
        roofAge: RoofAge.UNTER_5_JAHRE,
        electricityConsumption: ElectricityConsumption.ZWISCHEN_3000_5000_KWH,
        interestedInOtherSolutions: InterestedInOtherSolutions.JA,
      };

      return request(app.getHttpServer())
        .post('/api/survey/submit')
        .send(invalidDto)
        .expect(400);
    });

    it('should validate email format in contact info', () => {
      const invalidDto = {
        propertyType: PropertyType.EINFAMILIENHAUS,
        roofOrientation: [RoofOrientation.SUED],
        roofAge: RoofAge.UNTER_5_JAHRE,
        electricityConsumption: ElectricityConsumption.ZWISCHEN_3000_5000_KWH,
        interestedInOtherSolutions: InterestedInOtherSolutions.JA,
        contactInfo: {
          email: 'invalid-email',
        },
      };

      return request(app.getHttpServer())
        .post('/api/survey/submit')
        .send(invalidDto)
        .expect(400);
    });
  });

  describe('/api/survey (GET)', () => {
    it('should return all surveys', async () => {
      // First, create a survey
      const createSurveyDto = {
        propertyType: PropertyType.MEHRFAMILIENHAUS,
        roofOrientation: [RoofOrientation.OST],
        roofAge: RoofAge.FUENF_BIS_15_JAHRE,
        electricityConsumption: ElectricityConsumption.UEBER_5000_KWH,
        interestedInOtherSolutions: InterestedInOtherSolutions.NEIN,
      };

      await request(app.getHttpServer())
        .post('/api/survey/submit')
        .send(createSurveyDto)
        .expect(201);

      // Then, get all surveys
      return request(app.getHttpServer())
        .get('/api/survey')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
        });
    });
  });

  describe('/api/survey/:id (GET)', () => {
    it('should return a specific survey', async () => {
      // First, create a survey
      const createSurveyDto = {
        propertyType: PropertyType.GEWERBEIMMOBILIE,
        roofOrientation: [RoofOrientation.NORD],
        roofAge: RoofAge.UEBER_15_JAHRE,
        electricityConsumption: ElectricityConsumption.KEINE_ANGABE,
        interestedInOtherSolutions: InterestedInOtherSolutions.WEISS_NICHT,
      };

      const createResponse = await request(app.getHttpServer())
        .post('/api/survey/submit')
        .send(createSurveyDto)
        .expect(201);

      const surveyId = createResponse.body.id;

      // Then, get the specific survey
      return request(app.getHttpServer())
        .get(`/api/survey/${surveyId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(surveyId);
          expect(res.body.propertyType).toBe(createSurveyDto.propertyType);
        });
    });

    it('should return 404 for non-existent survey', () => {
      return request(app.getHttpServer())
        .get('/api/survey/non-existent-id')
        .expect(404);
    });
  });

  describe('/api/survey/:id (DELETE)', () => {
    it('should delete a survey', async () => {
      // First, create a survey
      const createSurveyDto = {
        propertyType: PropertyType.EINFAMILIENHAUS,
        roofOrientation: [RoofOrientation.SUED],
        roofAge: RoofAge.UNTER_5_JAHRE,
        electricityConsumption: ElectricityConsumption.UNTER_3000_KWH,
        interestedInOtherSolutions: InterestedInOtherSolutions.JA,
      };

      const createResponse = await request(app.getHttpServer())
        .post('/api/survey/submit')
        .send(createSurveyDto)
        .expect(201);

      const surveyId = createResponse.body.id;

      // Then, delete the survey
      await request(app.getHttpServer())
        .delete(`/api/survey/${surveyId}`)
        .expect(204);

      // Verify it's deleted
      return request(app.getHttpServer())
        .get(`/api/survey/${surveyId}`)
        .expect(404);
    });

    it('should return 404 when trying to delete non-existent survey', () => {
      return request(app.getHttpServer())
        .delete('/api/survey/non-existent-id')
        .expect(404);
    });
  });
});