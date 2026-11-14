import { Router } from 'express';
import { getEmissionsSummary, getOverview, getTrafficSummary } from '../controllers/dashboard.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();
router.get('/overview', requireAuth, getOverview);
router.get('/traffic-summary', requireAuth, getTrafficSummary);
router.get('/emissions-summary', requireAuth, getEmissionsSummary);
export default router;
