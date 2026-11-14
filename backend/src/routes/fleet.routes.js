import { Router } from 'express';
import { createVehicle, deleteVehicle, listFleet, updateVehicle } from '../controllers/fleet.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();
router.get('/', requireAuth, listFleet);
router.post('/', requireAuth, createVehicle);
router.put('/:id', requireAuth, updateVehicle);
router.delete('/:id', requireAuth, deleteVehicle);
export default router;
