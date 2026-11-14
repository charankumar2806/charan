import api from './api';

export const getTrafficData = () => api.get('/traffic');
export const postTrafficObservation = (payload) => api.post('/traffic', payload);
