import { Router } from 'express';
import authRoutes from './authRoutes.js';
import noteRoutes from './notesRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/notes', noteRoutes);

export default router;