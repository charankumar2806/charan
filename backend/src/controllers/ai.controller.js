import { generateGeminiResponse } from '../services/gemini.service.js';
import { predictTraffic } from '../services/prediction.service.js';
import { dashboardOverview } from '../utils/demo-data.js';

export const chat = async (req, res) => {
  const { prompt } = req.body;
  const context = 'The user is asking about SmartMove AI mobility analytics. Use only the application context and safe city mobility data.';
  const result = await generateGeminiResponse({ prompt, context });
  if (!result.answered) {
    return res.status(503).json({ error: result.message });
  }
  res.json({ answer: result.answer, dataSource: 'Gemini with application context', limitations: 'Gemini may not know live traffic; only operational data and configured context should be used.' });
};

export const analyzeTraffic = (req, res) => {
  const result = predictTraffic(req.body);
  res.json(result);
};

export const routeAdvice = (req, res) => {
  res.json({ message: 'Recommend alternate corridors when congestion > 70% and emissions exceed baseline for the selected route.' });
};

export const emissionAdvice = (req, res) => {
  res.json({ advice: 'Shift high-intensity trips to electric vehicles and discourage single-occupancy routes during peak windows.' });
};

export const mobilityReport = async (req, res) => {
  const reportText = `Today's mobility analysis indicates increased congestion in monitored road segments. Review the reported incidents and consider alternative routes. Estimated emissions can potentially be reduced through improved route selection.`;
  const payload = { report: reportText, metrics: dashboardOverview.metrics };
  const result = await generateGeminiResponse({ prompt: 'Generate a concise smart-city mobility report using the provided metrics.', context: JSON.stringify(payload) });
  if (!result.answered) {
    return res.json({ report: reportText, metrics: payload.metrics, source: 'application-generated summary', warning: result.message });
  }
  res.json({ report: result.answer, metrics: payload.metrics, source: 'Gemini with application data' });
};
