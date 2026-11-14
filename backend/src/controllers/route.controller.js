import { optimizeRoute } from '../services/routing.service.js';

export const optimize = async (req, res) => {
  const result = await optimizeRoute(req.body);
  res.json(result);
};

export const listRoutes = (req, res) => {
  res.json({ routes: [{ id: 'route-1', origin: 'MG Road', destination: 'Whitefield', distance: 16.4, duration: 24, routeType: 'balanced' }] });
};
