import express from "express";
import speechToTextController from "../controllers/speechToTextController.js";
import { protect } from '../middleware/authMiddleware.js';
import multer from "multer";

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

router.get("/", speechToTextController.getSpeechToText);
router.post("/", protect, upload.single("audio"), speechToTextController.postSpeechToText);


export default router;
