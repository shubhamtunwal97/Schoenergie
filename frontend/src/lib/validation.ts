import { z } from 'zod';

// Zod schemas for form validation with German error messages
export const PropertyTypeSchema = z.enum(['Einfamilienhaus', 'Mehrfamilienhaus', 'Gewerbeimmobilie'], {
  errorMap: () => ({ message: 'Bitte wählen Sie eine Immobilienart aus.' })
});

export const RoofOrientationSchema = z.array(
  z.enum(['Süd', 'West', 'Ost', 'Nord', 'Keine Angabe'])
).min(1, 'Bitte wählen Sie mindestens eine Dachausrichtung aus.');

export const RoofAgeSchema = z.enum(['Unter 5 Jahre', '5–15 Jahre', 'Über 15 Jahre', 'Keine Angabe'], {
  errorMap: () => ({ message: 'Bitte wählen Sie das Alter Ihres Dachs aus.' })
});

export const ElectricityConsumptionSchema = z.enum(['Unter 3.000 kWh', '3.000–5.000 kWh', 'Über 5.000 kWh', 'Keine Angabe'], {
  errorMap: () => ({ message: 'Bitte wählen Sie Ihren Stromverbrauch aus.' })
});

export const InterestedInOtherSolutionsSchema = z.enum(['Ja', 'Nein', 'Weiß nicht'], {
  errorMap: () => ({ message: 'Bitte geben Sie Ihr Interesse an weiteren Lösungen an.' })
});

export const ContactInfoSchema = z.object({
  name: z.string().optional(),
  email: z.string()
    .email('Bitte geben Sie eine gültige E-Mail-Adresse ein.')
    .optional()
    .or(z.literal('')),
  phone: z.string()
    .regex(/^[\+]?[0-9\s\-\(\)]*$/, 'Bitte geben Sie eine gültige Telefonnummer ein.')
    .optional()
    .or(z.literal(''))
}).optional();

// Main survey schema
export const SurveySchema = z.object({
  propertyType: PropertyTypeSchema,
  roofOrientation: RoofOrientationSchema,
  roofAge: RoofAgeSchema,
  electricityConsumption: ElectricityConsumptionSchema,
  interestedInOtherSolutions: InterestedInOtherSolutionsSchema,
  contactInfo: ContactInfoSchema
});

// Form validation helper
export const validateSurveyForm = (data: unknown) => {
  try {
    return {
      success: true,
      data: SurveySchema.parse(data),
      errors: null
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.reduce((acc, curr) => {
        const path = curr.path.join('.');
        acc[path] = curr.message;
        return acc;
      }, {} as Record<string, string>);

      return {
        success: false,
        data: null,
        errors: formattedErrors
      };
    }

    return {
      success: false,
      data: null,
      errors: { general: 'Ein unbekannter Validierungsfehler ist aufgetreten.' }
    };
  }
};

// Error message translations
export const ErrorMessages = {
  required: 'Dieses Feld ist erforderlich.',
  invalidEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
  invalidPhone: 'Bitte geben Sie eine gültige Telefonnummer ein.',
  minSelection: 'Bitte wählen Sie mindestens eine Option aus.',
  generalError: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
  networkError: 'Netzwerkfehler. Bitte überprüfen Sie Ihre Internetverbindung.',
  serverError: 'Serverfehler. Bitte versuchen Sie es später erneut.'
} as const;