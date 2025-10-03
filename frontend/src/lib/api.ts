import { SurveyFormData, SurveyResult } from '@/types/survey';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function submitSurvey(data: SurveyFormData): Promise<SurveyResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/survey/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Survey submission error:', error);
    throw error;
  }
}