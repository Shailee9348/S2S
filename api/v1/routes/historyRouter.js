import express from 'express';
import historyControllers from '../controllers/historyControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, historyControllers.getAllHistory);
router.delete('/:id', protect, historyControllers.deleteHistoryEntry);
router.delete('/', protect, historyControllers.clearAllHistory);

export default router;
