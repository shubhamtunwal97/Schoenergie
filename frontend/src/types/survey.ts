// Enums matching the backend structure
export type PropertyType = 'Einfamilienhaus' | 'Mehrfamilienhaus' | 'Gewerbeimmobilie';

export type RoofOrientation = 'Süd' | 'West' | 'Ost' | 'Nord' | 'Keine Angabe';

export type RoofAge = 'Unter 5 Jahre' | '5–15 Jahre' | 'Über 15 Jahre' | 'Keine Angabe';

export type ElectricityConsumption = 'Unter 3.000 kWh' | '3.000–5.000 kWh' | 'Über 5.000 kWh' | 'Keine Angabe';

export type InterestedInOtherSolutions = 'Ja' | 'Nein' | 'Weiß nicht';

// Contact information interface
export interface ContactInfo {
  name?: string;
  email?: string;
  phone?: string;
}

// Main survey data interface
export interface SurveyData {
  propertyType: PropertyType;
  roofOrientation: RoofOrientation[];
  roofAge: RoofAge;
  electricityConsumption: ElectricityConsumption;
  interestedInOtherSolutions: InterestedInOtherSolutions;
  contactInfo?: ContactInfo;
}

// Survey form data (used by react-hook-form)
export interface SurveyFormData extends SurveyData {
  // Additional form-specific fields if needed
}

// API response interfaces
export interface SurveyResult {
  recommendation: string;
  estimatedSavings: number;
  paybackPeriod: number;
  systemSize: number;
  score: number;
  details: {
    propertyTypeScore: number;
    roofOrientationScore: number;
    roofAgeScore: number;
    consumptionScore: number;
    suitabilityRating: 'Sehr gut' | 'Gut' | 'Mäßig' | 'Schlecht';
  };
}

export interface ApiResponse {
  success: boolean;
  data?: SurveyResult;
  message?: string;
  error?: string;
}

// Form validation errors
export interface FormErrors {
  propertyType?: string;
  roofOrientation?: string;
  roofAge?: string;
  electricityConsumption?: string;
  interestedInOtherSolutions?: string;
  contactInfo?: {
    name?: string;
    email?: string;
    phone?: string;
  };
}

// UI state interfaces
export interface LoadingState {
  isSubmitting: boolean;
  isLoading: boolean;
}

export interface UiState extends LoadingState {
  error: string | null;
  showResults: boolean;
  results: SurveyResult | null;
}