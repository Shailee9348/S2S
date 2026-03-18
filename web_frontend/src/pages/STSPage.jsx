import React, { useState } from "react";
import { FiMic, FiSquare, FiRepeat, FiPlay, FiPause, FiDownload, FiSettings, FiVolume2, FiGlobe } from "react-icons/fi";
import { FaWaveSquare } from "react-icons/fa";

const STSPage = () => {
    const [status, setStatus] = useState("idle"); // idle, recording, processing, ready
    const [transcript, setTranscript] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const [language, setLanguage] = useState("od-IN");

    const handleAction = () => {
        if (status === "idle") {
            setStatus("recording");
        } else if (status === "recording") {
            setStatus("processing");
            setTimeout(() => {
                setStatus("ready");
                setTranscript("Translation successful! Translated from source to target neural voice.");
            }, 2000);
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
                        <h1 className="text-3xl font-black text-gray-900 dark:text-gray-100 tracking-tight">Speech to Speech</h1>
                        <p className="text-gray-400 dark:text-gray-500 font-bold text-sm uppercase tracking-tighter">Real-time Vocal Translation</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Settings Top Bar */}
                    <div className="lg:col-span-12">
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center gap-8 transition-colors">
                            <div className="flex items-center gap-4 flex-1 w-full">
                                <span className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl"><FiGlobe /></span>
                                <div className="flex-1">
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Target Language</label>
                                    <select 
                                        className="w-full bg-transparent border-none text-gray-700 dark:text-gray-200 font-black focus:ring-0 cursor-pointer p-0"
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value)}
                                    >
                                        <option value="od-IN">Odia Neural (Default)</option>
                                        <option value="en-US">English (Natural)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="h-10 w-[1px] bg-gray-100 dark:bg-gray-800 hidden md:block"></div>
                            <div className="flex items-center gap-4 flex-1 w-full">
                                <span className="p-3 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl"><FiVolume2 /></span>
                                <div className="flex-1">
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Voice Profile</label>
                                    <select className="w-full bg-transparent border-none text-gray-700 dark:text-gray-200 font-black focus:ring-0 cursor-pointer p-0">
                                        <option>Studio Warm</option>
                                        <option>Crisp News</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Interaction Canvas */}
                    <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Input Mic */}
                        <div className="bg-white dark:bg-gray-900 p-10 rounded-[3rem] shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center text-center transition-colors min-h-[450px] relative overflow-hidden">
                             <div className={`absolute top-0 left-0 w-2 h-full bg-indigo-600 transition-opacity ${status === 'recording' ? 'opacity-100' : 'opacity-10'}`}></div>
                             <button 
                                onClick={handleAction}
                                className={`w-32 h-32 rounded-full flex items-center justify-center text-4xl transition-all duration-500 ${status === 'recording' ? 'bg-red-500 text-white animate-pulse scale-110 shadow-lg shadow-red-100' : 'bg-indigo-600 text-white hover:scale-110 shadow-2xl shadow-indigo-100 dark:shadow-none'}`}
                            >
                                {status === 'recording' ? <FiSquare /> : <FiMic />}
                            </button>
                            <p className="mt-8 font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-none">
                                {status === 'recording' ? 'Listening...' : 'Push to Translate'}
                            </p>
                            {status === 'recording' && (
                                <p className="mt-2 text-[10px] text-red-500 font-bold uppercase animate-pulse">Recording Active</p>
                            )}
                        </div>

                        {/* Translation Output */}
                        <div className={`bg-white dark:bg-gray-900 p-10 rounded-[3rem] shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col transition-all duration-500 min-h-[450px] relative ${status === 'ready' ? 'ring-8 ring-indigo-50 dark:ring-indigo-900/10' : ''}`}>
                            <h2 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-6">Translation Result</h2>
                             
                             <div className="flex-1 bg-gray-50 dark:bg-gray-800/30 rounded-3xl p-8 transition-colors flex flex-col items-center justify-center text-center">
                                {status === 'processing' ? (
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="flex gap-1 h-8 items-end">
                                            {[...Array(5)].map((_, i) => <div key={i} className="w-1.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s`, height: `${40 + Math.random() * 60}%` }}></div>)}
                                        </div>
                                        <p className="text-xs font-black text-indigo-600 uppercase tracking-tighter">Cloning Voice Proximity...</p>
                                    </div>
                                ) : status === 'ready' ? (
                                    <div className="space-y-8 w-full">
                                        <div className="flex items-center justify-center">
                                            <button onClick={() => setIsPlaying(!isPlaying)} className="w-20 h-20 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl shadow-xl hover:scale-105 active:scale-95 transition">
                                                {isPlaying ? <FiPause /> : <FiPlay className="ml-1" />}
                                            </button>
                                        </div>
                                        <div className="space-y-4">
                                            <p className="text-lg text-gray-600 dark:text-gray-300 font-medium italic">"{transcript}"</p>
                                            <div className="flex gap-2 justify-center">
                                                <button className="px-6 py-2 bg-gray-900 dark:bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><FiDownload /> WAV</button>
                                                <button className="px-6 py-2 bg-gray-50 dark:bg-gray-800 text-gray-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-indigo-600">Share</button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="opacity-20 flex flex-col items-center gap-4">
                                        <FiRepeat className="text-6xl" />
                                        <p className="text-xs font-black uppercase tracking-widest dark:text-white">Awaiting Session</p>
                                    </div>
                                )}
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default STSPage;