import React, { useState } from "react";
import { FiMic, FiSquare, FiDownload, FiTrash2, FiClock, FiSettings, FiFileText, FiRefreshCw } from "react-icons/fi";
import { FaWaveSquare } from "react-icons/fa";

const STTPage = () => {
    const [status, setStatus] = useState("idle"); // idle, recording, processing, ready
    const [transcript, setTranscript] = useState("");
    const [history, setHistory] = useState([]);

    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            let chunks = [];

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunks.push(e.data);
            };

            recorder.onstop = async () => {
                const audioBlob = new Blob(chunks, { type: 'audio/wav' });
                await uploadAudio(audioBlob);
                stream.getTracks().forEach(track => track.stop());
            };

            recorder.start();
            setMediaRecorder(recorder);
            setStatus("recording");
        } catch (err) {
            console.error("Mic Error:", err);
            alert("Unable to access microphone. Please check permissions.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setStatus("processing");
        }
    };

    const uploadAudio = async (blob) => {
        const formData = new FormData();
        formData.append("audio", blob, "recording.wav");

        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:5000/api/v1/stt", {
                method: "POST",
                headers: { 
                    "Authorization": `Bearer ${token}`
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Transcription failed");
            }

            const data = await response.json();
            setTranscript(data.transcript);
            setStatus("ready");
            setHistory([{ id: data.id || Date.now(), text: data.transcript, time: new Date().toLocaleTimeString() }, ...history]);
        } catch (err) {
            console.error("STT Error:", err);
            alert(`Transcription Error: ${err.message}`);
            setStatus("idle");
        }
    };

    const handleAction = () => {
        if (status === "idle") {
            startRecording();
        } else if (status === "recording") {
            stopRecording();
        } else {
            setStatus("idle");
            setTranscript("");
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-950 p-4 lg:p-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 dark:text-gray-100 tracking-tight">Speech to Text</h1>
                        <p className="text-gray-400 dark:text-gray-500 font-bold text-sm uppercase tracking-tighter">Neural Transcription Engine</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left Column: Recording controls */}
                    <div className="lg:col-span-12 flex flex-col md:flex-row gap-8">
                        {/* Recording Box */}
                        <div className="flex-1 bg-white dark:bg-gray-900 p-10 rounded-[3rem] shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center text-center relative overflow-hidden transition-colors min-h-[400px]">
                            <div className={`absolute inset-0 bg-indigo-600/5 transition-opacity duration-1000 ${status === 'recording' ? 'opacity-100' : 'opacity-0'}`}></div>
                            
                            <div className="relative z-10">
                                <button 
                                    onClick={handleAction}
                                    className={`w-32 h-32 rounded-full flex items-center justify-center text-4xl transition-all duration-500 ${status === 'recording' ? 'bg-red-500 text-white animate-pulse scale-110' : 'bg-indigo-600 text-white hover:scale-110 shadow-2xl shadow-indigo-100 dark:shadow-none'}`}
                                >
                                    {status === 'recording' ? <FiSquare /> : (status === 'ready' ? <FiRefreshCw /> : <FiMic />)}
                                </button>
                                <p className="mt-8 font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                                    {status === 'recording' ? 'Stop Recording' : (status === 'ready' ? 'Start Over' : 'Begin Recording')}
                                </p>
                            </div>

                            {status === 'recording' && (
                                <div className="mt-8 flex gap-1 items-end justify-center h-12">
                                    {[...Array(12)].map((_, i) => (
                                        <div key={i} className="w-1.5 bg-indigo-400 rounded-full animate-wave" style={{ animationDelay: `${i * 0.1}s`, height: `${Math.random() * 100}%` }}></div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Result/Transcript Box */}
                        <div className="flex-[1.5] bg-white dark:bg-gray-900 p-10 rounded-[3rem] shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col transition-colors min-h-[400px]">
                            <h2 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-6 flex justify-between">Live Transcription <FiFileText /></h2>
                            
                            <div className="flex-1 bg-gray-50/50 dark:bg-gray-800/50 rounded-3xl p-8 overflow-y-auto max-h-[300px] transition-colors relative">
                                {status === 'processing' ? (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm z-10 transition-colors">
                                        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                                        <p className="text-xs font-bold text-gray-400 uppercase italic">Analyzing frequency patterns...</p>
                                    </div>
                                ) : null}
                                <p className="text-2xl font-medium text-gray-700 dark:text-gray-200 leading-relaxed">
                                    {transcript || <span className="text-gray-300 dark:text-gray-700 italic">Words will appear here as you speak...</span>}
                                </p>
                            </div>

                            {status === 'ready' && (
                                <div className="mt-6 flex flex-wrap gap-4">
                                    <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition"><FiDownload /> Export TXT</button>
                                    <button className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition">Copy to Clipboard</button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer History */}
                    <div className="lg:col-span-12">
                         <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
                              <h2 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2"><FiClock /> Recent Transcripts</h2>
                              <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                                 {history.length === 0 ? (
                                     <p className="text-xs text-gray-300 dark:text-gray-700 italic">Transcription history is clear.</p>
                                 ) : (
                                     history.map(item => (
                                         <div key={item.id} className="min-w-[280px] bg-gray-50 dark:bg-gray-800/50 p-6 rounded-3xl border border-gray-50 dark:border-gray-800">
                                             <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-2">{item.time}</p>
                                             <p className="text-xs text-gray-700 dark:text-gray-300 font-medium line-clamp-2 mb-4">{item.text}</p>
                                             <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">View Full Text</button>
                                         </div>
                                     ))
                                 )}
                              </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default STTPage;
