import express, { text } from 'express';
import textToSpeechHandler from '../controllers/textToSpeechController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/', textToSpeechHandler.getTextToSpeech);
router.post('/', protect, textToSpeechHandler.postTextToSpeech);

export default router;