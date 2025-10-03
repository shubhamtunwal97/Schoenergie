import { Test, TestingModule } from '@nestjs/testing';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';
import { CreateSurveyDto, PropertyType, RoofOrientation, RoofAge, ElectricityConsumption, InterestedInOtherSolutions } from './dto';

describe('SurveyController', () => {
  let controller: SurveyController;
  let service: SurveyService;

  const mockSurveyService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveyController],
      providers: [
        {
          provide: SurveyService,
          useValue: mockSurveyService,
        },
      ],
    }).compile();

    controller = module.get<SurveyController>(SurveyController);
    service = module.get<SurveyService>(SurveyService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a survey', async () => {
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

      const expectedResult = {
        id: '1',
        ...createSurveyDto,
        recommendation: 'Ja' as const,
        submittedAt: new Date(),
      };

      mockSurveyService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createSurveyDto);

      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createSurveyDto);
    });
  });

  describe('findAll', () => {
    it('should return all surveys', async () => {
      const expectedResult = [
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

      mockSurveyService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll();

      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a survey by id', async () => {
      const expectedResult = {
        id: '1',
        propertyType: PropertyType.EINFAMILIENHAUS,
        roofOrientation: [RoofOrientation.SUED],
        roofAge: RoofAge.UNTER_5_JAHRE,
        electricityConsumption: ElectricityConsumption.ZWISCHEN_3000_5000_KWH,
        interestedInOtherSolutions: InterestedInOtherSolutions.JA,
        recommendation: 'Ja' as const,
        submittedAt: new Date(),
      };

      mockSurveyService.findOne.mockResolvedValue(expectedResult);

      const result = await controller.findOne('1');

      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('remove', () => {
    it('should delete a survey', async () => {
      mockSurveyService.remove.mockResolvedValue(undefined);

      await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});