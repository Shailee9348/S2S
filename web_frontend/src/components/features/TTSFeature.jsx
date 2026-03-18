import React, { useState } from 'react';
import { FaPlay, FaDownload, FaVolumeUp } from 'react-icons/fa';

const TTSFeature = () => {
  const [text, setText] = useState("");
  const [lang, setLang] = useState("od-IN");
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const handleConvert = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/v1/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, target_language_code: lang }),
      });
      const data = await response.json();
      setAudioUrl(data.audios[0]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
      <div className="mb-6">
        <label className="block text-sm font-bold text-gray-400 uppercase mb-2">Target Language</label>
        <select value={lang} onChange={(e) => setLang(e.target.value)} className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-600 outline-none">
          <option value="od-IN">Odia</option>
          <option value="en-IN">English (India)</option>
          <option value="hi-IN">Hindi</option>
        </select>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to convert to speech..."
        className="w-full h-40 bg-gray-50 border-none rounded-3xl p-6 focus:ring-2 focus:ring-indigo-600 outline-none resize-none mb-6"
      />
      <button
        onClick={handleConvert}
        disabled={loading || !text}
        className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition active:scale-95 disabled:bg-gray-300 flex items-center justify-center gap-2"
      >
        {loading ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" /> : <><FaVolumeUp /> Generate Voice</>}
      </button>

      {audioUrl && (
        <div className="mt-8 p-6 bg-green-50 rounded-2xl border border-green-100 animate-fade-in">
          <p className="text-green-700 font-bold mb-4">Voice Generated!</p>
          <button onClick={() => new Audio(`data:audio/wav;base64,${audioUrl}`).play()} className="bg-green-600 text-white px-6 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-green-700 transition w-full justify-center">
            <FaPlay /> Play Generated Speech
          </button>
        </div>
      )}
    </div>
  );
};

export default TTSFeature;
