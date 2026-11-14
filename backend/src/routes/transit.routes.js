import { Router } from 'express';
import { listRoutes, listStops } from '../controllers/transit.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/routes', requireAuth, listRoutes);
router.get('/stops', requireAuth, listStops);

export default router;
