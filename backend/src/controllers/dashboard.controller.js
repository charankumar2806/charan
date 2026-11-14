import { dashboardOverview } from '../utils/demo-data.js';

export const getOverview = (req, res) => res.json(dashboardOverview);

export const getTrafficSummary = (req, res) => {
  res.json({
    overview: dashboardOverview.metrics,
    trend: dashboardOverview.trafficTrend,
    source: 'demonstration data'
  });
};

export const getEmissionsSummary = (req, res) => {
  res.json({
    total: dashboardOverview.metrics.totalEmissions,
    source: 'demonstration data'
  });
};
