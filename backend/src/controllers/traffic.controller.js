import { demoIncidents, trafficObservations } from '../utils/demo-data.js';
import { predictTraffic } from '../services/prediction.service.js';

export const getTraffic = (req, res) => {
  res.json({ observations: trafficObservations, source: 'demonstration data' });
};

export const getTrafficSnapshot = (req, res) => {
  res.json({
    source: 'demonstration data',
    updatedAt: new Date().toISOString(),
    observations: trafficObservations,
  });
};

export const getTrafficPrediction = (req, res) => {
  const payload = {
    vehicleCount: Number(req.query.vehicleCount || 720),
    averageSpeed: Number(req.query.averageSpeed || 38),
    historicalTraffic: Number(req.query.historicalTraffic || 48),
    timeOfDay: req.query.timeOfDay || '18:00',
    dayOfWeek: req.query.dayOfWeek || 'Wednesday',
    weather: req.query.weather || 'Clear',
  };

  res.json({ source: 'historical model', prediction: predictTraffic(payload) });
};

export const getCongestionZones = (req, res) => {
  res.json({
    source: 'demonstration data',
    zones: [
      { id: 'zone-1', name: 'Outer Ring Road', congestion: 82, risk: 'High', delayMinutes: 12 },
      { id: 'zone-2', name: 'MG Road', congestion: 63, risk: 'Moderate', delayMinutes: 7 },
      { id: 'zone-3', name: 'Whitefield', congestion: 81, risk: 'High', delayMinutes: 14 },
    ],
  });
};

export const getIncidentAlerts = (req, res) => {
  res.json({
    source: 'demonstration data',
    incidents: demoIncidents,
  });
};

export const createTraffic = (req, res) => {
  const { name, latitude, longitude, level, velocity } = req.body;
  trafficObservations.push({ id: `obs-${Date.now()}`, name, latitude, longitude, level, velocity });
  res.status(201).json({ message: 'Traffic observation saved.', observation: trafficObservations.at(-1) });
};
