import VoiceHistory from "../models/voiceHistoryModel.js";

export const getAllHistory = async (req, res) => {
  try {
    const history = await VoiceHistory.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteHistoryEntry = async (req, res) => {
  try {
    const { id } = req.params;
    await VoiceHistory.findByIdAndDelete(id);
    res.json({ message: "History entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const clearAllHistory = async (req, res) => {
  try {
    await VoiceHistory.deleteMany({});
    res.json({ message: "All history cleared" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getAllHistory,
  deleteHistoryEntry,
  clearAllHistory,
};
