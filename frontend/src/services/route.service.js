import api from './api';

export const optimizeRoute = (payload) => api.post('/routes/optimize', payload);
export const getRoutes = () => api.get('/routes');
