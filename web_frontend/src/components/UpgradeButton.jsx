import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiZap, FiCheck, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const UpgradeButton = ({ variant = "primary", className = "" }) => {
    const navigate = useNavigate();
    const { planType } = useAuth();
    const [loading, setLoading] = useState(false);

    const isPro = planType === 'pro';

    const handleClick = () => {
        if (isPro) return;
        
        setLoading(true);
        // Simulate a small transition delay for better UX
        setTimeout(() => {
            navigate('/pricing');
            setLoading(false);
        }, 800);
    };

    if (isPro) {
        return (
            <button 
                className={`flex items-center gap-2 px-6 py-3 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-2xl font-black uppercase tracking-widest text-[10px] border border-gray-100 dark:border-gray-700 cursor-default ${className}`}
            >
                <FiCheck className="text-green-500" /> Current Plan
            </button>
        );
    }

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className={`
                relative flex items-center justify-center gap-2 px-8 py-4 
                ${variant === "primary" ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-900 text-indigo-600'}
                rounded-2xl font-black uppercase tracking-widest text-xs
                shadow-xl shadow-indigo-100 dark:shadow-none
                transition-all duration-300 transform 
                hover:-translate-y-1 hover:shadow-2xl hover:scale-[1.02]
                active:scale-95 active:translate-y-0
                disabled:opacity-75 disabled:cursor-wait
                overflow-hidden group
                ${className}
            `}
        >
            {/* Glossy Overlay Animation */}
            <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            {loading ? (
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
            ) : (
                <>
                    <FiZap className="group-hover:text-yellow-400 transition-colors" />
                    <span>Upgrade Now</span>
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </>
            )}
        </button>
    );
};

export default UpgradeButton;
