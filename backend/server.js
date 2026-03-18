import express from "express";
import cors from "cors";
import "dotenv/config";

import textToSpeechRouter from "./api/v1/routes/textToSpeechRouter.js"
import speechToTextRouter from "./api/v1/routes/speechToTextRouter.js";
import speechToSpeechRouter from "./api/v1/routes/speechToSpeechRouter.js";
import textToTextRouter from "./api/v1/routes/textToTextRouter.js";
import connectDB from "./api/v1/config/db.js";
import feedbackRouter from "./api/v1/routes/feedbackRouter.js";
import historyRouter from "./api/v1/routes/historyRouter.js";
import authRouter from "./api/v1/routes/authRouter.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello, this is the API for OdiaAudioGen!");
});

app.use('/api/v1/tts', textToSpeechRouter);
app.use('/api/v1/stt', speechToTextRouter);
app.use('/api/v1/sts', speechToSpeechRouter);
app.use('/api/v1/ttt', textToTextRouter);
app.use('/api/v1/feedback', feedbackRouter);
app.use('/api/v1/history', historyRouter);
app.use('/api/v1/auth', authRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const conn = connectDB();