import React, { useState, useRef } from "react";
import { FaMicrophone, FaStop, FaCopy } from "react-icons/fa";

const STTFeature = () => {
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [sourceLang, setSourceLang] = useState("od-IN");

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (e) => (audioChunksRef.current.push(e.data));
      mediaRecorder.onstop = () => sendToSTT(new Blob(audioChunksRef.current, { type: "audio/wav" }));
      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error(err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const sendToSTT = async (blob) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("audio", blob, "recording.wav");
    formData.append("languageCode", sourceLang);
    try {
      const response = await fetch("http://localhost:5000/api/v1/stt", { method: "POST", body: formData });
      const data = await response.json();
      setTranscript(data.transcript);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
      <div className="mb-6">
        <label className="block text-sm font-bold text-gray-400 uppercase mb-2">Input Language</label>
        <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)} className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-600 outline-none">
          <option value="od-IN">Odia</option>
          <option value="en-IN">English (India)</option>
          <option value="hi-IN">Hindi</option>
        </select>
      </div>

      <div className="flex flex-col items-center py-10 bg-indigo-50 rounded-3xl mb-8">
        <button onClick={recording ? stopRecording : startRecording} className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl shadow-xl transition transform hover:scale-110 ${recording ? 'bg-red-500 animate-pulse' : 'bg-indigo-600'} text-white`}>
          {recording ? <FaStop /> : <FaMicrophone />}
        </button>
        <p className="mt-4 font-bold text-indigo-900">{recording ? "Listening... Tap to Stop" : "Tap to Transcribe"}</p>
      </div>

      {loading && <div className="text-center text-indigo-600 animate-bounce font-bold mb-4">Converting voice to text...</div>}

      {transcript && (
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 relative group animate-fade-in">
          <p className="text-xs font-bold text-gray-400 uppercase mb-2">Transcription Result</p>
          <p className="text-xl text-gray-800 font-medium pr-10">{transcript}</p>
          <button onClick={() => { navigator.clipboard.writeText(transcript); alert("Copied!"); }} className="absolute top-6 right-6 p-2 bg-white text-gray-400 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition">
            <FaCopy />
          </button>
        </div>
      )}
    </div>
  );
};

export default STTFeature;
