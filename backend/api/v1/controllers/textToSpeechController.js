import { convertTextToSpeech } from '../utils/convertTextToSpeech.js';
import VoiceHistory from "../models/voiceHistoryModel.js";

export function getTextToSpeech(req, res) {
  res.json({
    message: "This is the NEW text-to-speech endpoint",
    data: {
      text: "Hello, this is a sample text for TTS.",
      target_language_code: "en-US",
    },
  });
}

export async function postTextToSpeech(req, res) {
  try {
    const { text, target_language_code } = req.body;

    // Validate required fields
    if (!text || !target_language_code) {
      return res.status(400).json({
        error: "Missing 'text' or 'target_language_code' in request body.",
      });
    }

    // Call utility function
    // You can call it in different ways:
    
    // 1. Basic usage:
    const result = await convertTextToSpeech(text, { 
      targetLanguageCode: target_language_code 
    });
    
    // 2. With additional options (if API supports them):
    // const result = await convertTextToSpeech(text, { 
    //   targetLanguageCode: target_language_code,
		//   model: bulbul:v1 or bulbul:v2
    // });

    // Save to History using the authenticated user id
    const history = new VoiceHistory({
      user: req.user.id,
      type: 'TTS',
      transcript: text,
      audioUrl: result.audios[0],
      targetLanguage: target_language_code,
    });
    await history.save();

    res.json({ ...result, id: history._id });

  } catch (error) {
    console.error("Controller error:", error.message);
    
    // Return appropriate HTTP status based on error type
    let statusCode = 500;
    if (error.message.includes('required')) {
      statusCode = 400;
    } else if (error.message.includes('API_SECRET')) {
      statusCode = 500;
    }

    res.status(statusCode).json({ error: error.message });
  }
}

export default {
  getTextToSpeech,
  postTextToSpeech,
};
