import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiShield, FiZap, FiGlobe, FiCommand, FiCpu } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

function HomePage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <div className="bg-[#fcfcff] dark:bg-gray-950 min-h-screen relative overflow-hidden transition-colors duration-700">
      
      {/* Dynamic Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-50 dark:bg-indigo-900/10 rounded-full blur-[120px] animate-float opacity-40"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-50 dark:bg-purple-900/10 rounded-full blur-[120px] animate-float opacity-30 [animation-delay:-3s]"></div>

      {/* Main Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-40 relative z-10">
        <div className="flex flex-col items-center text-center space-y-12 animate-slide-up">
          
          <div className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border border-gray-100 dark:border-gray-800 shadow-sm transition hover:scale-105 duration-300">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">v1.2 Platform Ready</span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-gray-900 dark:text-gray-100 tracking-tighter leading-[0.9] transition-colors">
            Neural <br /> 
            <span className="text-indigo-600 block sm:inline">Odisha</span> 
            <span className="text-gray-200 dark:text-gray-800 hidden sm:inline"> / </span>
            Vox.
          </h1>

          <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 max-w-2xl font-medium leading-relaxed transition-colors">
            State-of-the-art speech synthesis, real-time transcription, and voice cloning specifically optimized for the Odia linguistic pattern.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-md pt-8">
            {isLoggedIn ? (
              <button 
                onClick={() => navigate('/workbench')}
                className="w-full px-12 py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-lg shadow-2xl shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 hover:-translate-y-2 transition-all duration-500 flex items-center justify-center gap-3 active:scale-95"
              >
                Go to Workbench <FiArrowRight className="text-2xl" />
              </button>
            ) : (
              <>
                <button 
                  onClick={() => navigate('/register')}
                  className="w-full sm:flex-1 px-10 py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-lg shadow-2xl shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 hover:-translate-y-2 transition-all duration-500 flex items-center justify-center gap-3 active:scale-95"
                >
                  Get Started <FiArrowRight />
                </button>
                <button 
                  onClick={() => navigate('/login')}
                  className="w-full sm:flex-1 px-10 py-6 glass dark:bg-gray-900/30 text-gray-700 dark:text-white rounded-[2rem] font-black text-lg border border-gray-100 dark:border-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 hover:-translate-y-2 transition-all duration-500 active:scale-95"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-40 animate-fade-in [animation-delay:0.5s]">
          {[
            { icon: <FiZap />, title: 'Latency (24ms)', desc: 'Optimized for live broadcast and interactive apps.' },
            { icon: <FiCpu />, title: 'GPU Neural', desc: 'Hardware accelerated inference on Tier-1 nodes.' },
            { icon: <FiShield />, title: 'Privacy First', desc: 'Enterprise data remains strictly localized.' },
            { icon: <FiGlobe />, title: 'Odia Specialized', desc: 'Fine-tuned on 10,000+ hours of localized dialect.' }
          ].map((f, i) => (
            <div key={i} className="bg-white dark:bg-gray-900/50 p-10 rounded-[2.5rem] border border-gray-50 dark:border-gray-800 shadow-sm transition hover:shadow-xl hover:-translate-y-2 duration-500 group">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center text-2xl mb-8 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-gray-100 mb-2 tracking-tight">{f.title}</h3>
              <p className="text-sm font-bold text-gray-400 dark:text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Geometric Element */}
      <div className="absolute right-[-100px] top-[20%] opacity-10 dark:opacity-20 pointer-events-none animate-float">
          <FiCommand className="text-[400px] text-indigo-600" />
      </div>
    </div>
  );
}

export default HomePage;