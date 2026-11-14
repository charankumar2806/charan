import api from './api';

export const getTransitRoutes = () => api.get('/transit/routes');
export const getTransitStops = () => api.get('/transit/stops');
