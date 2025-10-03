import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { DatabaseService } from '../database/database.service';
import { CreateSurveyDto, PropertyType, RoofOrientation, RoofAge, ElectricityConsumption, InterestedInOtherSolutions } from './dto';

describe('SurveyService', () => {
  let service: SurveyService;
  let databaseService: DatabaseService;

  const mockDatabaseService = {
    saveSurvey: jest.fn(),
    getAllSurveys: jest.fn(),
    getSurveyById: jest.fn(),
    deleteSurvey: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SurveyService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
      ],
    }).compile();

    service = module.get<SurveyService>(SurveyService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a survey with random recommendation', async () => {
      const createSurveyDto: CreateSurveyDto = {
        propertyType: PropertyType.EINFAMILIENHAUS,
        roofOrientation: [RoofOrientation.SUED],
        roofAge: RoofAge.UNTER_5_JAHRE,
        electricityConsumption: ElectricityConsumption.ZWISCHEN_3000_5000_KWH,
        interestedInOtherSolutions: InterestedInOtherSolutions.JA,
        contactInfo: {
          name: 'Test User',
          email: 'test@example.com',
        },
      };

      mockDatabaseService.saveSurvey.mockResolvedValue(undefined);

      const result = await service.create(createSurveyDto);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('submittedAt');
      expect(result.recommendation).toMatch(/^(Ja|Nein)$/);
      expect(result.propertyType).toBe(createSurveyDto.propertyType);
      expect(mockDatabaseService.saveSurvey).toHaveBeenCalledWith(result);
    });
  });

  describe('findAll', () => {
    it('should return all surveys', async () => {
      const mockSurveys = [
        {
          id: '1',
          propertyType: PropertyType.EINFAMILIENHAUS,
          roofOrientation: [RoofOrientation.SUED],
          roofAge: RoofAge.UNTER_5_JAHRE,
          electricityConsumption: ElectricityConsumption.ZWISCHEN_3000_5000_KWH,
          interestedInOtherSolutions: InterestedInOtherSolutions.JA,
          recommendation: 'Ja' as const,
          submittedAt: new Date(),
        },
      ];

      mockDatabaseService.getAllSurveys.mockResolvedValue(mockSurveys);

      const result = await service.findAll();

      expect(result).toEqual(mockSurveys);
      expect(mockDatabaseService.getAllSurveys).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a survey by id', async () => {
      const mockSurvey = {
        id: '1',
        propertyType: PropertyType.EINFAMILIENHAUS,
        roofOrientation: [RoofOrientation.SUED],
        roofAge: RoofAge.UNTER_5_JAHRE,
        electricityConsumption: ElectricityConsumption.ZWISCHEN_3000_5000_KWH,
        interestedInOtherSolutions: InterestedInOtherSolutions.JA,
        recommendation: 'Ja' as const,
        submittedAt: new Date(),
      };

      mockDatabaseService.getSurveyById.mockResolvedValue(mockSurvey);

      const result = await service.findOne('1');

      expect(result).toEqual(mockSurvey);
      expect(mockDatabaseService.getSurveyById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException when survey not found', async () => {
      mockDatabaseService.getSurveyById.mockResolvedValue(null);

      await expect(service.findOne('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should delete a survey', async () => {
      const mockSurvey = {
        id: '1',
        propertyType: PropertyType.EINFAMILIENHAUS,
        roofOrientation: [RoofOrientation.SUED],
        roofAge: RoofAge.UNTER_5_JAHRE,
        electricityConsumption: ElectricityConsumption.ZWISCHEN_3000_5000_KWH,
        interestedInOtherSolutions: InterestedInOtherSolutions.JA,
        recommendation: 'Ja' as const,
        submittedAt: new Date(),
      };

      mockDatabaseService.getSurveyById.mockResolvedValue(mockSurvey);
      mockDatabaseService.deleteSurvey.mockResolvedValue(undefined);

      await service.remove('1');

      expect(mockDatabaseService.getSurveyById).toHaveBeenCalledWith('1');
      expect(mockDatabaseService.deleteSurvey).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException when survey not found', async () => {
      mockDatabaseService.getSurveyById.mockResolvedValue(null);

      await expect(service.remove('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});