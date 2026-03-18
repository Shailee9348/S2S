import { convertSpeechToText } from '../utils/convertSpeechToText.js'
import VoiceHistory from "../models/voiceHistoryModel.js";

export const getSpeechToText = (req, res) => {
  res.json({
    message:
      "This is the Speech to Text API endpoint. Please use POST method with audio data.",
    status: "success",
  });
};

export const postSpeechToText = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Missing audio file in request." });
    }

    const result = await convertSpeechToText(req.file);

    // Save to History using the authenticated user id
    const history = new VoiceHistory({
      user: req.user.id,
      type: 'STT',
      transcript: result.transcript,
      sourceLanguage: result.language_code,
    });
    await history.save();

    res.json({ ...result, id: history._id });
  } catch (error) {
    console.error("Controller error:", error.message);

    // Return appropriate HTTP status based on error type
    const statusCode = error.message.includes('Missing audio file') ? 400 : 500;
    res.status(statusCode).json({ error: error.message });
  }
};

export default {
  getSpeechToText,
  postSpeechToText,
};
