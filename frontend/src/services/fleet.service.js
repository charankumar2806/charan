import api from './api';

export const getFleet = () => api.get('/fleet');
export const createVehicle = (payload) => api.post('/fleet', payload);
export const updateVehicle = (id, payload) => api.put(`/fleet/${id}`, payload);
export const deleteVehicle = (id) => api.delete(`/fleet/${id}`);
