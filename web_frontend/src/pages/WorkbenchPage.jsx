import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMic, FiType, FiRepeat, FiClock, FiSettings, FiArrowRight, FiShield, FiStar, FiZap, FiCpu, FiPlus } from "react-icons/fi";
import { FaWaveSquare } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import UpgradeButton from "../components/UpgradeButton.jsx";

const WorkbenchPage = () => {
    const navigate = useNavigate();
    const { planType } = useAuth();
    const [history] = useState([
        { id: 1, type: 'TTS', text: 'Namaskar Odisha, welcome to our platform.', time: '10:30 AM' },
        { id: 2, type: 'STT', text: 'Voice transcription session in Cuttack.', time: 'Yesterday' }
    ]);

    const services = [
        { 
            id: 'tts', 
            name: 'Text to Speech', 
            desc: 'High-fidelity synthesis for localized dialects.',
            icon: <FiType />, 
            path: '/tts',
            bg: 'bg-blue-50 dark:bg-blue-900/10',
            text: 'text-blue-600 dark:text-blue-400',
            gradient: 'from-blue-600 to-indigo-600'
        },
        { 
            id: 'stt', 
            name: 'Speech to Text', 
            desc: 'Real-time high-accuracy transcription engine.',
            icon: <FiMic />, 
            path: '/stt',
            bg: 'bg-indigo-50 dark:bg-indigo-900/10',
            text: 'text-indigo-600 dark:text-indigo-400',
            gradient: 'from-indigo-600 to-purple-600'
        },
        { 
            id: 'sts', 
            name: 'Speech to Speech', 
            desc: 'Neural voice cloning with instant translation.',
            icon: <FiRepeat />, 
            path: '/sts',
            bg: 'bg-purple-50 dark:bg-purple-900/10',
            text: 'text-purple-600 dark:text-purple-400',
            gradient: 'from-purple-600 to-pink-600'
        }
    ];

    return (
        <div className="min-h-screen bg-[#fcfcff] dark:bg-gray-950 p-4 lg:p-8 transition-colors duration-300 relative overflow-hidden">
            
            {/* Background Mesh */}
            <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-indigo-50/50 dark:bg-indigo-900/5 rounded-full blur-[100px] animate-float opacity-30"></div>
            
            <div className="max-w-7xl mx-auto space-y-12 relative z-10">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 animate-slide-up">
                    <div className="space-y-4">
                        <span className="inline-block px-4 py-1.5 bg-indigo-600 text-white text-[10px] font-black rounded-xl mb-2 uppercase tracking-[0.2em] shadow-lg shadow-indigo-100 dark:shadow-none animate-scale-in">Command Center</span>
                        <h1 className="text-5xl lg:text-7xl font-black text-gray-900 dark:text-gray-100 tracking-tighter leading-none">Choose Your <br />Neural Power.</h1>
                    </div>
                </div>

                {/* Bento Grid Services */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-fade-in [animation-delay:0.3s]">
                    {services.map((service, idx) => (
                        <div 
                            key={service.id}
                            onClick={() => navigate(service.path)}
                            className={`md:col-span-4 bg-white dark:bg-gray-900 p-10 rounded-[3rem] shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/20 hover:-translate-y-3 transition-all duration-500 cursor-pointer group flex flex-col justify-between min-h-[400px] transition-colors`}
                        >
                            <div className="space-y-8">
                                <div className={`w-20 h-20 ${service.bg} ${service.text} rounded-[2rem] flex items-center justify-center text-4xl group-hover:bg-gradient-to-br ${service.gradient} group-hover:text-white transition-all duration-500 shadow-sm shadow-black/5`}>
                                    {service.icon}
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-gray-900 dark:text-gray-100 mb-3 tracking-tighter">{service.name}</h2>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm font-bold leading-relaxed">{service.desc}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between border-t border-gray-50 dark:border-gray-800 pt-8 mt-8">
                                <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest group-hover:text-indigo-600 transition">Initialize Engine</span>
                                <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 text-gray-400 rounded-2xl flex items-center justify-center transition group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-45">
                                    <FiArrowRight />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Secondary Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in [animation-delay:0.5s]">
                    
                    {/* Activity Feed */}
                    <div className="lg:col-span-8 bg-white dark:bg-gray-900 p-10 rounded-[3rem] shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h2 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2"><FiClock className="text-indigo-600" /> Neural Activity Feed</h2>
                                <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase">Live history of your processing tasks</p>
                            </div>
                            <button onClick={() => navigate('/history')} className="text-[10px] font-black text-indigo-600 uppercase tracking-widest border-b-2 border-indigo-100 dark:border-indigo-900/30 pb-1 hover:border-indigo-600 transition">View Archive</button>
                        </div>
                        <div className="space-y-4">
                            {history.map((item) => (
                                <div key={item.id} className="flex items-center gap-6 p-6 bg-gray-50/50 dark:bg-gray-800/50 rounded-3xl border border-transparent hover:border-indigo-100 dark:hover:border-indigo-900/30 hover:scale-[1.01] transition duration-300 group">
                                    <div className="w-12 h-12 bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center text-xs font-black text-indigo-600 shadow-sm border border-gray-100 dark:border-gray-800 group-hover:rotate-[360deg] duration-700 transition-transform">{item.type}</div>
                                    <div className="flex-1">
                                        <p className="text-base font-bold text-gray-800 dark:text-gray-200 line-clamp-1">{item.text}</p>
                                        <p className="text-[10px] text-gray-400 mt-1 uppercase font-black tracking-widest">{item.time} • Odia (Neutral)</p>
                                    </div>
                                    <button className="p-3 text-gray-300 dark:text-gray-600 hover:text-indigo-600 transition transform hover:translate-x-1"><FiArrowRight /></button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pro Status Box */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className={`p-10 rounded-[3rem] text-white shadow-xl shadow-indigo-500/10 dark:shadow-none relative overflow-hidden transition-all duration-500 group ${planType === 'pro' ? 'bg-indigo-600' : 'bg-gray-900 dark:bg-black'}`}>
                            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                                {planType === 'pro' ? <FiStar className="text-[180px]" /> : <FiZap className="text-[180px]" />}
                            </div>
                            
                            <div className="relative z-10 space-y-10">
                                <div className="space-y-4">
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] opacity-60">S2S Neural Ecosystem</h3>
                                    <p className="text-3xl font-black tracking-tighter leading-none">{planType === 'pro' ? 'Pro Master Tier' : 'Explorer Plan'}</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-60">
                                        <span>Capacity Utilization</span>
                                        <span>{planType === 'pro' ? 'Unlimited' : '10 / 10 Used'}</span>
                                    </div>
                                    <div className={`h-2.5 rounded-full overflow-hidden ${planType === 'pro' ? 'bg-indigo-700/50' : 'bg-gray-800'}`}>
                                        <div className={`h-full bg-white transition-all duration-1000 ${planType === 'pro' ? 'w-0' : 'w-full bg-red-500'}`}></div>
                                    </div>
                                </div>
                                
                                <UpgradeButton className="w-full py-5" variant={planType === 'pro' ? 'secondary' : 'primary'} />
                            </div>
                        </div>

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm transition hover:shadow-indigo-500/5 duration-500">
                                <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-xl flex items-center justify-center text-xl mb-4"><FiShield /></div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                                <p className="text-xs font-black text-gray-900 dark:text-gray-100">Encrypted</p>
                            </div>
                            <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm transition hover:shadow-indigo-500/5 duration-500">
                                <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-xl flex items-center justify-center text-xl mb-4"><FiCpu /></div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Queue</p>
                                <p className="text-xs font-black text-gray-900 dark:text-gray-100">Instant</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkbenchPage;
