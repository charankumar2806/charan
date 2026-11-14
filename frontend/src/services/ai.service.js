import api from './api';

export const chatWithAI = (payload) => api.post('/ai/chat', payload);
export const analyzeTraffic = (payload) => api.post('/ai/analyze-traffic', payload);
export const routeAdvice = (payload) => api.post('/ai/route-advice', payload);
export const emissionAdvice = (payload) => api.post('/ai/emission-advice', payload);
export const mobilityReport = () => api.post('/ai/mobility-report', {});
