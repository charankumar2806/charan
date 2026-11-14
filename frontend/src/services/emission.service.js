import api from './api';

export const calculateEmissions = (payload) => api.post('/emissions/calculate', payload);
export const getEmissions = () => api.get('/emissions');
export const getEmissionSummary = () => api.get('/emissions/summary');
