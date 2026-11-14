import { Router } from 'express';
import { login, logout, me, register } from '../controllers/auth.controller.js';
import { validate } from '../middleware/validation.middleware.js';
import { loginSchema, registerSchema } from '../schemas/index.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.get('/me', requireAuth, me);
router.post('/logout', requireAuth, logout);

export default router;
