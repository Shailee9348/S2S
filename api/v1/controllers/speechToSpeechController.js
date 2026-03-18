import { convertSpeechToText } from "../utils/convertSpeechToText.js";
import { convertTextToSpeech } from "../utils/convertTextToSpeech.js";
import { translateText } from "../utils/translateText.js";
import VoiceHistory from "../models/voiceHistoryModel.js";

export const getSpeechToSpeech = (req, res) => {
  res.json({
    message:
      "This is the Speech to Speech API endpoint. Please use POST method with audio data.",
    status: "success",
  });
};

export const postSpeechToSpeech = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No audio file provided" });
    }

    // Step 1 Speech to Text
    const speechResult = await convertSpeechToText(req.file);
    console.log("Speech to Text Result:", speechResult.language_code, speechResult.transcript);

    const targetLanguage = speechResult.language_code === "en-IN" ? "od-IN" : "en-IN";
    console.log("targetLanguage", targetLanguage);

    // Step 2 Text Translation
    const translationResult = await translateText(speechResult.transcript, targetLanguage);

    // Step 3 Text to Speech
    const ttsResult = await convertTextToSpeech(translationResult.translation, {
      targetLanguageCode: targetLanguage,
    });

    // Step 4 Save to History
    const history = new VoiceHistory({
      type: 'STS',
      transcript: speechResult.transcript,
      translation: translationResult.translation,
      audioUrl: ttsResult.audios[0], // Storing base64 for now as requested for simplicity
      sourceLanguage: speechResult.language_code,
      targetLanguage: targetLanguage,
    });
    await history.save();

    res.json({
      message: "Speech to Speech conversion successful",
      id: history._id,
      originalAudio: req.file.originalname,
      transcript: speechResult.transcript,
      translation: translationResult.translation,
      audio: ttsResult.audios[0],
      pipeline: {
        sourceLanguage: speechResult.language_code,
        targetLanguage: targetLanguage,
      },
    });
  } catch (error) {
    console.error("STS Pipeline Error:", error);
    res.status(500).json({ error: error.message });
  }
};

export default {
  getSpeechToSpeech,
  postSpeechToSpeech,
};
