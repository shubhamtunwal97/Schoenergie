'use client';

import { SurveyResult } from '@/types/survey';

interface SurveyResultsProps {
  result: SurveyResult;
  onStartNew: () => void;
}

export default function SurveyResults({ result, onStartNew }: SurveyResultsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getSuitabilityColor = (rating: string) => {
    switch (rating) {
      case 'Sehr gut':
        return 'bg-green-100 text-green-800';
      case 'Gut':
        return 'bg-blue-100 text-blue-800';
      case 'Mäßig':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Result */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ihre Solar-Auswertung
          </h2>
          <div className={`inline-block px-4 py-2 rounded-full font-medium ${getSuitabilityColor(result.details.suitabilityRating)}`}>
            Eignung: {result.details.suitabilityRating}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {formatCurrency(result.estimatedSavings)}
            </div>
            <div className="text-sm text-gray-600">Jährliche Ersparnis</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {Math.round(result.paybackPeriod)} Jahre
            </div>
            <div className="text-sm text-gray-600">Amortisationszeit</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {Math.round(result.systemSize * 10) / 10} kWp
            </div>
            <div className="text-sm text-gray-600">Empfohlene Anlagengröße</div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2">Empfehlung</h3>
          <p className="text-gray-700">{result.recommendation}</p>
        </div>
      </div>

      {/* Detailed Scores */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Bewertung im Detail
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Immobilientyp</span>
            <span className="font-medium">{result.details.propertyTypeScore}/100</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-700">Dachausrichtung</span>
            <span className="font-medium">{result.details.roofOrientationScore}/100</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-700">Dachzustand</span>
            <span className="font-medium">{result.details.roofAgeScore}/100</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-700">Stromverbrauch</span>
            <span className="font-medium">{result.details.consumptionScore}/100</span>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center font-medium">
              <span className="text-gray-900">Gesamtbewertung</span>
              <span className="text-lg">{result.score}/100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">
          Nächste Schritte
        </h3>
        <p className="text-gray-700 mb-4">
          Interessiert an einer kostenlosen Beratung? Unsere Experten helfen Ihnen gerne weiter.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onStartNew}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Neue Bewertung
          </button>
          <a
            href="mailto:info@schoenergie.de?subject=Solar-Beratung"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Beratung anfragen
          </a>
        </div>
      </div>
    </div>
  );
}