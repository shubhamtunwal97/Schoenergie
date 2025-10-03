'use client';

import { useState } from 'react';
import SurveyForm from '@/components/SurveyForm';
import SurveyResults from '@/components/SurveyResults';
import { SurveyResult } from '@/types/survey';

export default function HomePage() {
  const [surveyResult, setSurveyResult] = useState<SurveyResult | null>(null);

  const handleSurveyComplete = (result: SurveyResult) => {
    setSurveyResult(result);
  };

  const handleStartNew = () => {
    setSurveyResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {!surveyResult ? (
          <div>
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Solar-Check für Ihr Dach
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Finden Sie heraus, ob sich eine Solaranlage für Ihr Dach lohnt.
                Unser kostenloser Check dauert nur wenige Minuten.
              </p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <SurveyForm onComplete={handleSurveyComplete} />
            </div>

            {/* Benefits */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl mb-2">💰</div>
                <h3 className="font-medium text-gray-900 mb-1">Kosten sparen</h3>
                <p className="text-sm text-gray-600">
                  Reduzieren Sie Ihre Stromkosten erheblich
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🌱</div>
                <h3 className="font-medium text-gray-900 mb-1">Umwelt schützen</h3>
                <p className="text-sm text-gray-600">
                  Leisten Sie einen Beitrag zum Klimaschutz
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">📈</div>
                <h3 className="font-medium text-gray-900 mb-1">Wert steigern</h3>
                <p className="text-sm text-gray-600">
                  Erhöhen Sie den Wert Ihrer Immobilie
                </p>
              </div>
            </div>
          </div>
        ) : (
          <SurveyResults result={surveyResult} onStartNew={handleStartNew} />
        )}
      </div>
    </div>
  );
}