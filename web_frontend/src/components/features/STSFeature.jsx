import React, { useState, useRef } from "react";
import { FaMicrophone, FaStop, FaPlay, FaDownload, FaSyncAlt } from "react-icons/fa";
import { FiMessageSquare, FiTrendingUp } from "react-icons/fi";

const STSFeature = () => {
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [sourceLang, setSourceLang] = useState("en-IN");
  const [targetLang, setTargetLang] = useState("od-IN");
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        sendAudioToBackend(audioBlob);
      };

      mediaRecorder.start();
      setRecording(true);
      setError(null);
    } catch (err) {
      setError("Microphone access denied.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const sendAudioToBackend = async (blob) => {
    setLoading(true);
    setResult(null);
    const formData = new FormData();
    formData.append("audio", blob, "recording.wav");
    formData.append("sourceLanguage", sourceLang);
    formData.append("targetLanguage", targetLang);

    try {
      const response = await fetch("http://localhost:5000/api/v1/sts", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Conversion failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1">
          <label className="block text-sm font-bold text-gray-400 uppercase mb-2">Input Language</label>
          <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)} className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-600 outline-none">
            <option value="en-IN">English (India)</option>
            <option value="od-IN">Odia</option>
            <option value="hi-IN">Hindi</option>
          </select>
        </div>
        <div className="flex items-end pb-4 hidden md:block"><FaSyncAlt className="text-gray-300" /></div>
        <div className="flex-1">
          <label className="block text-sm font-bold text-gray-400 uppercase mb-2">Output Language</label>
          <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)} className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-600 outline-none">
            <option value="od-IN">Odia</option>
            <option value="en-IN">English (India)</option>
            <option value="hi-IN">Hindi</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col items-center py-10 border-2 border-dashed border-gray-100 rounded-3xl mb-8">
        <button onClick={recording ? stopRecording : startRecording} className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl shadow-xl transition transform hover:scale-110 ${recording ? 'bg-red-500 animate-pulse' : 'bg-indigo-600'} text-white`}>
          {recording ? <FaStop /> : <FaMicrophone />}
        </button>
        <p className="mt-4 font-bold text-gray-500">{recording ? "Recording... Click to translate" : "Tap to Speak"}</p>
      </div>

      {loading && <div className="text-center text-indigo-600 animate-pulse font-bold">Processing Voice...</div>}
      
      {result && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase mb-2">Recognized Text</p>
            <p className="text-lg text-gray-800">"{result.transcript}"</p>
          </div>
          <div className="bg-indigo-600 p-6 rounded-2xl text-white shadow-lg">
            <p className="text-xs font-bold text-indigo-200 uppercase mb-2">Translated Audio Ready</p>
            <p className="text-xl font-bold mb-4">"{result.translation}"</p>
            <button onClick={() => new Audio(`data:audio/wav;base64,${result.audio}`).play()} className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-100 transition w-full justify-center">
              <FaPlay /> Play Voice Result
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default STSFeature;
