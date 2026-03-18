import mongoose from 'mongoose';

const voiceHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['TTS', 'STT', 'S2S', 'T2T'],
    required: true,
  },
  transcript: String,
  translation: String,
  audioUrl: String, // This could be a path to a stored file or a base64 string
  sourceLanguage: String,
  targetLanguage: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const VoiceHistory = mongoose.model('VoiceHistory', voiceHistorySchema);

export default VoiceHistory;
