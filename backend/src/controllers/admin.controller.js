export const getUsers = (req, res) => {
  res.json({ users: [{ id: 'u-1', name: 'Aisha Rao', email: 'admin@smartmove.ai', role: 'administrator' }, { id: 'u-2', name: 'Rahul Nair', email: 'operator@smartmove.ai', role: 'operator' }] });
};

export const getAnalytics = (req, res) => {
  res.json({ analytics: { activeProjects: 92, incidentRisk: 0.32, transitLatency: 8.4, emissionsReduction: 17 } });
};

export const updateIncidentStatus = (req, res) => {
  res.json({ message: `Incident ${req.params.id} status updated to ${req.body.status || 'review'}.` });
};
