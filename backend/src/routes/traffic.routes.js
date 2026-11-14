import { Router } from 'express';
import {
  createTraffic,
  getCongestionZones,
  getIncidentAlerts,
  getTraffic,
  getTrafficPrediction,
  getTrafficSnapshot,
} from '../controllers/traffic.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();
router.get('/', requireAuth, getTraffic);
router.get('/snapshot', requireAuth, getTrafficSnapshot);
router.get('/prediction', requireAuth, getTrafficPrediction);
router.get('/zones', requireAuth, getCongestionZones);
router.get('/incidents', requireAuth, getIncidentAlerts);
router.post('/', requireAuth, createTraffic);

export default router;
