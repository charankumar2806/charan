import { demoVehicles } from '../utils/demo-data.js';

export const listFleet = (req, res) => {
  res.json({ vehicles: demoVehicles, total: demoVehicles.length });
};

export const createVehicle = (req, res) => {
  const vehicle = { id: `veh-${Date.now()}`, ...req.body };
  demoVehicles.push(vehicle);
  res.status(201).json({ message: 'Vehicle added.', vehicle });
};

export const updateVehicle = (req, res) => {
  const index = demoVehicles.findIndex((entry) => entry.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Vehicle not found.' });
  demoVehicles[index] = { ...demoVehicles[index], ...req.body };
  res.json({ message: 'Vehicle updated.', vehicle: demoVehicles[index] });
};

export const deleteVehicle = (req, res) => {
  const index = demoVehicles.findIndex((entry) => entry.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Vehicle not found.' });
  demoVehicles.splice(index, 1);
  res.status(204).send();
};
