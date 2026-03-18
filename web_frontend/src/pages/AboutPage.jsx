import React from "react";
import { FiTarget, FiCpu, FiGlobe, FiUsers, FiArrowRight } from "react-icons/fi";
import { FaWaveSquare } from "react-icons/fa";

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-950 transition-colors duration-300 overflow-hidden">
            {/* Hero Section */}
            <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transition-colors">
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <FaWaveSquare className="text-[40rem] text-indigo-600 -translate-x-1/2 -translate-y-1/2 rotate-12" />
                </div>
                
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <span className="inline-block py-1.5 px-4 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8 animate-fade-in">Established 2026</span>
                    <h1 className="text-5xl lg:text-7xl font-black text-gray-900 dark:text-gray-100 tracking-tighter mb-8 max-w-4xl mx-auto leading-none transition-colors">
                        Empowering the <br /> 
                        <span className="text-indigo-600">Voice of Odisha</span>
                    </h1>
                    <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium transition-colors">
                        OdishaVox is a mission-driven platform dedicated to bringing world-class neural speech processing to the Odia linguistic ecosystem. 
                        We blend cultural preservation with cutting-edge AI.
                    </p>
                </div>
            </section>

            {/* Content Blocks */}
            <section className="py-24 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: <FiTarget />, title: 'Mission', desc: 'Preserving the linguistic nuances of Odia dialects through digital transformation.', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                        { icon: <FiCpu />, title: 'InnoVation', desc: 'Running on high-performance GPU clusters for near-zero latency processing.', color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
                        { icon: <FiGlobe />, title: 'Accessibility', desc: 'Bridging the digital divide for over 45 million Odia speakers worldwide.', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
                        { icon: <FiUsers />, title: 'Community', desc: 'Built by language lovers and AI researchers from the heart of Bhubaneswar.', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' }
                    ].map((card, idx) => (
                        <div key={idx} className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-500 group">
                            <div className={`w-14 h-14 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}>{card.icon}</div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-gray-100 mb-3 uppercase tracking-tighter">{card.title}</h3>
                            <p className="text-sm text-gray-400 dark:text-gray-500 leading-relaxed font-bold">{card.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Team/Story Section */}
                <div className="mt-24 bg-indigo-600 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden shadow-2xl shadow-indigo-200 dark:shadow-none">
                    <div className="absolute bottom-0 right-0 p-20 opacity-10">
                        <FaWaveSquare className="text-[20rem]" />
                    </div>
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl lg:text-5xl font-black leading-none tracking-tighter">Our Story <br />Begins in Odisha.</h2>
                            <p className="text-lg opacity-80 leading-relaxed font-medium">
                                We noticed that while global AI models existed, they often struggled with the beautiful complexity of Odia phonetics and regional accents. 
                                OdishaVox was born out of a desire to create a "Neural Library" for our home state—a system that truly understands us.
                            </p>
                            <button className="flex items-center gap-3 bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-50 transition">
                                Join the Mission <FiArrowRight />
                            </button>
                        </div>
                        <div className="bg-indigo-500/30 backdrop-blur-md border border-white/20 p-8 rounded-[2.5rem]">
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <p className="text-4xl font-black mb-1">45M+</p>
                                    <p className="text-xs font-bold uppercase tracking-widest opacity-60">Potential Users</p>
                                </div>
                                <div>
                                    <p className="text-4xl font-black mb-1">98%</p>
                                    <p className="text-xs font-bold uppercase tracking-widest opacity-60">Accuracy Rate</p>
                                </div>
                                <div>
                                    <p className="text-4xl font-black mb-1">20+</p>
                                    <p className="text-xs font-bold uppercase tracking-widest opacity-60">Neural Voices</p>
                                </div>
                                <div>
                                    <p className="text-4xl font-black mb-1">0.5s</p>
                                    <p className="text-xs font-bold uppercase tracking-widest opacity-60">Avg. Latency</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
