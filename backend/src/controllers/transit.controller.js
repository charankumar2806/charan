import { demoTransitRoutes, demoTransitStops } from '../utils/demo-data.js';

export const listRoutes = (req, res) => {
  res.json({ routes: demoTransitRoutes });
};

export const listStops = (req, res) => {
  res.json({ stops: demoTransitStops });
};
