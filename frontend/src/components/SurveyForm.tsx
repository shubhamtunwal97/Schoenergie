'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SurveySchema } from '@/lib/validation';
import { submitSurvey } from '@/lib/api';
import { SurveyFormData, SurveyResult } from '@/types/survey';

interface SurveyFormProps {
  onComplete: (result: SurveyResult) => void;
}

export default function SurveyForm({ onComplete }: SurveyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SurveyFormData>({
    resolver: zodResolver(SurveySchema),
  });

  const roofOrientationValues = watch('roofOrientation') || [];

  const onSubmit = async (data: SurveyFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await submitSurvey(data);
      onComplete(result);
    } catch (error) {
      setSubmitError('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.');
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Question 1: Property Type */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-900">
          1. Welche Art von Immobilie besitzen Sie? *
        </label>
        <div className="space-y-2">
          {['Einfamilienhaus', 'Mehrfamilienhaus', 'Gewerbeimmobilie'].map((type) => (
            <label key={type} className="flex items-center cursor-pointer">
              <input
                type="radio"
                value={type}
                {...register('propertyType')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-3 text-gray-700">{type}</span>
            </label>
          ))}
        </div>
        {errors.propertyType && (
          <p className="text-red-600 text-sm">{errors.propertyType.message}</p>
        )}
      </div>

      {/* Question 2: Roof Orientation */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-900">
          2. Wie ist Ihr Dach ausgerichtet? * (Mehrfachauswahl möglich)
        </label>
        <div className="space-y-2">
          {['Süd', 'West', 'Ost', 'Nord', 'Keine Angabe'].map((orientation) => (
            <label key={orientation} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                value={orientation}
                {...register('roofOrientation')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-3 text-gray-700">{orientation}</span>
            </label>
          ))}
        </div>
        {errors.roofOrientation && (
          <p className="text-red-600 text-sm">{errors.roofOrientation.message}</p>
        )}
      </div>

      {/* Question 3: Roof Age */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-900">
          3. Wie alt ist Ihr Dach? *
        </label>
        <div className="space-y-2">
          {['Unter 5 Jahre', '5–15 Jahre', 'Über 15 Jahre', 'Keine Angabe'].map((age) => (
            <label key={age} className="flex items-center cursor-pointer">
              <input
                type="radio"
                value={age}
                {...register('roofAge')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-3 text-gray-700">{age}</span>
            </label>
          ))}
        </div>
        {errors.roofAge && (
          <p className="text-red-600 text-sm">{errors.roofAge.message}</p>
        )}
      </div>

      {/* Question 4: Electricity Consumption */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-900">
          4. Wie hoch ist Ihr Stromverbrauch pro Jahr? *
        </label>
        <div className="space-y-2">
          {['Unter 3.000 kWh', '3.000–5.000 kWh', 'Über 5.000 kWh', 'Keine Angabe'].map((consumption) => (
            <label key={consumption} className="flex items-center cursor-pointer">
              <input
                type="radio"
                value={consumption}
                {...register('electricityConsumption')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-3 text-gray-700">{consumption}</span>
            </label>
          ))}
        </div>
        {errors.electricityConsumption && (
          <p className="text-red-600 text-sm">{errors.electricityConsumption.message}</p>
        )}
      </div>

      {/* Question 5: Interest in Other Solutions */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-900">
          5. Sind Sie auch an weiteren Energielösungen interessiert? *
        </label>
        <div className="space-y-2">
          {['Ja', 'Nein', 'Weiß nicht'].map((interest) => (
            <label key={interest} className="flex items-center cursor-pointer">
              <input
                type="radio"
                value={interest}
                {...register('interestedInOtherSolutions')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-3 text-gray-700">{interest}</span>
            </label>
          ))}
        </div>
        {errors.interestedInOtherSolutions && (
          <p className="text-red-600 text-sm">{errors.interestedInOtherSolutions.message}</p>
        )}
      </div>

      {/* Contact Information */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Kontaktinformationen (optional)
        </h3>
        <p className="text-gray-600 mb-4">
          Hinterlassen Sie Ihre Kontaktdaten für eine kostenlose Beratung.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              {...register('contactInfo.name')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ihr Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">E-Mail</label>
            <input
              type="email"
              {...register('contactInfo.email')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ihre.email@beispiel.de"
            />
            {errors.contactInfo?.email && (
              <p className="text-red-600 text-sm mt-1">{errors.contactInfo.email.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Telefonnummer</label>
            <input
              type="tel"
              {...register('contactInfo.phone')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+49 123 456789"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-6">
        {submitError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">{submitError}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200"
        >
          {isSubmitting ? 'Wird gesendet...' : 'Auswertung erhalten'}
        </button>
      </div>
    </form>
  );
}