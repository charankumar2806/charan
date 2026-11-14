import { Router } from 'express';
import { calculate, listEmissions, summary } from '../controllers/emission.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validation.middleware.js';
import { emissionSchema } from '../schemas/index.js';

const router = Router();

router.get('/', requireAuth, listEmissions);
router.get('/summary', requireAuth, summary);
router.post('/calculate', requireAuth, validate(emissionSchema), calculate);

export default router;
