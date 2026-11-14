import { demoNotifications } from '../utils/demo-data.js';

export const listNotifications = (req, res) => {
  res.json({ notifications: demoNotifications });
};

export const markRead = (req, res) => {
  const item = demoNotifications.find((entry) => entry.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Notification not found.' });
  item.read = true;
  res.json({ message: 'Notification marked as read.', item });
};
