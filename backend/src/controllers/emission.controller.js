import { calculateEmissions } from '../services/emission.service.js';

export const calculate = (req, res) => {
  const result = calculateEmissions(req.body);
  res.json(result);
};

export const listEmissions = (req, res) => {
  res.json({ emissions: [{ id: 'em-1', totalKg: 180, vehicle: 'EV-01', date: '2026-11-14' }] });
};

export const summary = (req, res) => {
  const data = calculateEmissions({ distanceKm: 18, fuelType: 'electric', vehicleType: 'car' });
  res.json({
    total: 2.8,
    perJourney: 172,
    perKm: 9.6,
    savings: data.savings,
    assumptions: data.assumptions
  });
};
