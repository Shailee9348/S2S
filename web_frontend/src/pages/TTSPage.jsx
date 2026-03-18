import React, { useState, useRef, useEffect } from "react";
import { FiType, FiPlay, FiPause, FiDownload, FiTrash2, FiSettings, FiShare2, FiClock } from "react-icons/fi";
import { FaWaveSquare } from "react-icons/fa";

const TTSPage = () => {
    const [textInput, setTextInput] = useState("");
    const [status, setStatus] = useState("idle"); // idle, processing, ready
    const [isPlaying, setIsPlaying] = useState(false);
    const [settings, setSettings] = useState({ language: "od-IN", voiceType: "Neutral", pitch: 1.0, speed: 1.0 });
    const [audioUrl, setAudioUrl] = useState(null);
    const [history, setHistory] = useState([]);
    const audioRef = useRef(null);

    // Audio Playback Handler
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(e => {
                    console.error("Playback failed:", e);
                    setIsPlaying(false);
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    const handleGenerate = async () => {
        if (!textInput) return;
        setStatus("processing");
        setAudioUrl(null);
        setIsPlaying(false);
        
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:5000/api/v1/tts", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    text: textInput, 
                    target_language_code: settings.language 
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Neural synthesis failed");
            }

            const data = await response.json();
            
            // Sarvam API returns an array of audios (base64 string)
            let audioSource = data.audios[0];
            
            // Standard Sarvam Response is base64. Ensure it's prefixed for HTML5 Audio
            if (audioSource && !audioSource.startsWith('data:')) {
                audioSource = `data:audio/wav;base64,${audioSource}`;
            }
            
            setStatus("ready");
            setAudioUrl(audioSource); 

            const newItem = { 
                id: data.id || Date.now(), 
                text: textInput, 
                time: new Date().toLocaleTimeString(), 
                type: "TTS",
                audioUrl: audioSource
            };
            setHistory([newItem, ...history]);
        } catch (err) {
            console.error("TTS Error:", err.message);
            alert(`Signal Error: ${err.message}`);
            setStatus("idle");
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-950 p-4 lg:p-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 dark:text-gray-100 tracking-tight">Text to Speech</h1>
                        <p className="text-gray-400 dark:text-gray-500 font-bold text-sm uppercase tracking-tighter">Neural Voice Synthesis</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Settings Panel */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
                            <h2 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2"><FiSettings /> Voice Parameters</h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 dark:text-gray-500 mb-2 uppercase">Target Language</label>
                                    <select 
                                        value={settings.language}
                                        onChange={(e) => setSettings({...settings, language: e.target.value})}
                                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl px-4 py-3 outline-none ring-1 ring-gray-100 dark:ring-gray-700 focus:ring-2 focus:ring-indigo-500 dark:text-gray-200 text-sm font-bold"
                                    >
                                        <option value="od-IN">Odia (Default)</option>
                                        <option value="en-IN">English</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    {['Male', 'Female'].map(v => (
                                        <button key={v} onClick={() => setSettings({...settings, voiceType: v})} className={`py-3 rounded-xl text-xs font-black transition ${settings.voiceType === v ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400' : 'bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400'}`}>{v}</button>
                                    ))}
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase mb-2"><span>Speed</span><span>{settings.speed}x</span></div>
                                        <input type="range" min="0.5" max="2.0" step="0.1" value={settings.speed} onChange={(e) => setSettings({...settings, speed: e.target.value})} className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase mb-2"><span>Pitch</span><span>{settings.pitch}</span></div>
                                        <input type="range" min="0.5" max="2.0" step="0.1" value={settings.pitch} onChange={(e) => setSettings({...settings, pitch: e.target.value})} className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* History */}
                        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
                             <h2 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2"><FiClock /> Recent TTS</h2>
                             <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {history.length === 0 ? (
                                    <p className="text-xs text-gray-300 dark:text-gray-700 italic">No history yet.</p>
                                ) : (
                                    history.map(item => (
                                        <div key={item.id} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-50 dark:border-gray-800">
                                            <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-1">{item.time}</p>
                                            <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-2">{item.text}</p>
                                        </div>
                                    ))
                                )}
                             </div>
                        </div>
                    </div>

                    {/* Main Interaction */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="bg-white dark:bg-gray-900 p-10 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col min-h-[500px] transition-colors relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition">
                                <FiType className="text-9xl text-indigo-600" />
                            </div>
                            
                            <h2 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-6">Input Territory</h2>
                            
                            <textarea 
                                value={textInput}
                                onChange={(e) => setTextInput(e.target.value)}
                                placeholder="Write or paste your Odia/English text here..."
                                className="w-full flex-1 bg-gray-50/50 dark:bg-gray-800/50 rounded-3xl p-8 border-none focus:ring-4 focus:ring-indigo-50/20 dark:focus:ring-indigo-900/20 outline-none resize-none text-xl font-medium text-gray-700 dark:text-gray-200 placeholder:text-gray-200 dark:placeholder:text-gray-700 transition-all shadow-inner"
                            />

                            <div className="mt-8 flex flex-col md:flex-row items-center gap-6">
                                <button 
                                    onClick={handleGenerate}
                                    disabled={status === 'processing'}
                                    className="w-full md:w-auto px-12 py-5 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 transition transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                                >
                                    {status === 'processing' ? (
                                        <span className="flex items-center gap-2 italic"><span className="w-2 h-2 bg-white rounded-full animate-bounce"></span> Synthesizing...</span>
                                    ) : (
                                        <>Generate Voice <FiPlay className="text-lg" /></>
                                    )}
                                </button>
                                
                                {status === 'ready' && (
                                     <div className="flex-1 w-full bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-2xl flex items-center gap-4 animate-fade-in">
                                         <audio 
                                             ref={audioRef} 
                                             src={audioUrl} 
                                             onEnded={() => setIsPlaying(false)} 
                                             className="hidden" 
                                         />
                                         <button onClick={() => setIsPlaying(!isPlaying)} className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-lg shadow-lg">
                                             {isPlaying ? <FiPause /> : <FiPlay className="ml-1" />}
                                         </button>
                                         <div className="flex-1 h-1 bg-indigo-200 dark:bg-indigo-800 rounded-full overflow-hidden">
                                             <div className={`h-full bg-indigo-600 ${isPlaying ? 'w-full transition-all duration-1000' : 'w-0'}`}></div>
                                         </div>
                                         <a 
                                             href={audioUrl} 
                                             download="neural_voice.wav"
                                             className="p-3 bg-white dark:bg-gray-800 text-indigo-600 rounded-xl hover:bg-indigo-50 shadow-sm"
                                         >
                                             <FiDownload />
                                         </a>
                                     </div>
                                 )}
                            </div>
                        </div>

                        {/* Feature Highlights */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { label: 'Natural Flow', desc: 'AI-driven prosody for human-like speech.' },
                                { label: 'Odia Optimization', desc: 'Perfected for localized accents.' },
                                { label: 'HD Quality', desc: '48kHz studio-grade audio output.' }
                            ].map(f => (
                                <div key={f.label} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 transition-colors">
                                    <h3 className="text-sm font-black text-gray-900 dark:text-gray-100 mb-2">{f.label}</h3>
                                    <p className="text-xs text-gray-400 dark:text-gray-500">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TTSPage;
