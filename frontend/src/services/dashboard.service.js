import api from './api';

export const getDashboardOverview = () => api.get('/dashboard/overview');
export const getTrafficSummary = () => api.get('/dashboard/traffic-summary');
export const getEmissionsSummary = () => api.get('/dashboard/emissions-summary');
