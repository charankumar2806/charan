import { demoIncidents } from '../utils/demo-data.js';

export const listIncidents = (req, res) => {
  res.json({ incidents: demoIncidents });
};

export const createIncident = (req, res) => {
  const incident = { id: `inc-${Date.now()}`, status: 'open', ...req.body };
  demoIncidents.push(incident);
  res.status(201).json({ incident });
};

export const updateIncident = (req, res) => {
  const index = demoIncidents.findIndex((entry) => entry.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Incident not found.' });
  demoIncidents[index] = { ...demoIncidents[index], ...req.body };
  res.json({ incident: demoIncidents[index] });
};

export const deleteIncident = (req, res) => {
  const index = demoIncidents.findIndex((entry) => entry.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Incident not found.' });
  demoIncidents.splice(index, 1);
  res.status(204).send();
};
