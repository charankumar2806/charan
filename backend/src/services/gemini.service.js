import { GoogleGenAI } from '@google/genai';
import { geminiConfig } from '../config/gemini.js';

export const generateGeminiResponse = async ({ prompt, context = '' }) => {
  if (!geminiConfig.apiKey) {
    return {
      answered: false,
      message: 'Gemini API key is not configured. Add GEMINI_API_KEY to backend/.env to enable AI responses.'
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey: geminiConfig.apiKey });
    const response = await ai.models.generateContent({
      model: geminiConfig.model,
      contents: [{ role: 'user', parts: [{ text: `${context}\n\n${prompt}` }] }]
    });
    return {
      answered: true,
      answer: response.text || 'Gemini returned an empty response.'
    };
  } catch (error) {
    return {
      answered: false,
      message: `Gemini request failed: ${error.message}`
    };
  }
};
