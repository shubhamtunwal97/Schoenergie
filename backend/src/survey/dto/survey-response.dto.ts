import { ContactInfoDto } from './contact-info.dto';
import {
  PropertyType,
  RoofOrientation,
  RoofAge,
  ElectricityConsumption,
  InterestedInOtherSolutions,
} from './create-survey.dto';

export class SurveyResponseDto {
  id: string;
  propertyType: PropertyType;
  roofOrientation: RoofOrientation[];
  roofAge: RoofAge;
  electricityConsumption: ElectricityConsumption;
  interestedInOtherSolutions: InterestedInOtherSolutions;
  contactInfo?: ContactInfoDto;
  recommendation: 'Ja' | 'Nein';
  submittedAt: Date;
}