import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { ContactInfoDto } from './contact-info.dto';

export enum PropertyType {
  EINFAMILIENHAUS = 'Einfamilienhaus',
  MEHRFAMILIENHAUS = 'Mehrfamilienhaus',
  GEWERBEIMMOBILIE = 'Gewerbeimmobilie',
}

export enum RoofOrientation {
  SUED = 'Süd',
  WEST = 'West',
  OST = 'Ost',
  NORD = 'Nord',
  KEINE_ANGABE = 'Keine Angabe',
}

export enum RoofAge {
  UNTER_5_JAHRE = 'Unter 5 Jahre',
  FUENF_BIS_15_JAHRE = '5–15 Jahre',
  UEBER_15_JAHRE = 'Über 15 Jahre',
  KEINE_ANGABE = 'Keine Angabe',
}

export enum ElectricityConsumption {
  UNTER_3000_KWH = 'Unter 3.000 kWh',
  ZWISCHEN_3000_5000_KWH = '3.000–5.000 kWh',
  UEBER_5000_KWH = 'Über 5.000 kWh',
  KEINE_ANGABE = 'Keine Angabe',
}

export enum InterestedInOtherSolutions {
  JA = 'Ja',
  NEIN = 'Nein',
  WEISS_NICHT = 'Weiß nicht',
}

export class CreateSurveyDto {
  @IsEnum(PropertyType)
  propertyType: PropertyType;

  @IsArray()
  @IsEnum(RoofOrientation, { each: true })
  roofOrientation: RoofOrientation[];

  @IsEnum(RoofAge)
  roofAge: RoofAge;

  @IsEnum(ElectricityConsumption)
  electricityConsumption: ElectricityConsumption;

  @IsEnum(InterestedInOtherSolutions)
  interestedInOtherSolutions: InterestedInOtherSolutions;

  @IsOptional()
  @ValidateNested()
  @Type(() => ContactInfoDto)
  contactInfo?: ContactInfoDto;
}