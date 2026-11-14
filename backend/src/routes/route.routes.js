import { Router } from 'express';
import { listRoutes, optimize } from '../controllers/route.controller.js';
import { validate } from '../middleware/validation.middleware.js';
import { routeSchema } from '../schemas/index.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();
router.post('/optimize', requireAuth, validate(routeSchema), optimize);
router.get('/', requireAuth, listRoutes);
export default router;
