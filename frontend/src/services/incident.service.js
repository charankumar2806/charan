import api from './api';

export const getIncidents = () => api.get('/incidents');
export const createIncident = (payload) => api.post('/incidents', payload);
export const updateIncident = (id, payload) => api.put(`/incidents/${id}`, payload);
