import express from 'express';
import {
  getPublicSessions,
  getMySessions,
  getMySessionById,
  saveDraft,
  publishSession,
} from '../controllers/sessionController.js';

import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/sessions', getPublicSessions);
router.get('/my-sessions', authenticateToken, getMySessions);
router.get('/my-sessions/:id', authenticateToken, getMySessionById);
router.post('/my-sessions/save-draft', authenticateToken, saveDraft);
router.post('/my-sessions/publish', authenticateToken, publishSession);

export default router;
