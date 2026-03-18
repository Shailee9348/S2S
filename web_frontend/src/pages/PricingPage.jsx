import React, { useState } from "react";
import { FiCheck, FiStar, FiZap, FiCpu, FiGlobe, FiShield, FiArrowRight, FiX, FiAlertCircle } from "react-icons/fi";

const PricingPage = () => {
    const [showLimitModal, setShowLimitModal] = useState(false);

    const plans = [
        {
            name: "Free Explorer",
            price: "₹0",
            period: "/forever",
            desc: "Ideal for beginners exploring AI voice capabilities.",
            features: [
                "10 Speech Conversions / day",
                "Max 30s per Audio",
                "Standard Neural Voices",
                "Community Support",
                "Basic Speed Controls"
            ],
            cta: "Current Plan",
            popular: false,
            color: "text-gray-400 dark:text-gray-500",
            bg: "bg-white dark:bg-gray-900",
            disabled: true
        },
        {
            name: "Basic Neural",
            price: "₹499",
            period: "/month",
            desc: "Perfect for students and casual Odia creators.",
            features: [
                "100 Speech Conversions / day",
                "Max 5m per Audio",
                "All Standard Voices",
                "HD Audio Export (WAV)",
                "No OdishaVox Watermark",
                "Priority Email Support"
            ],
            cta: "Upgrade Now",
            popular: false,
            color: "text-blue-600 dark:text-blue-400",
            bg: "bg-white dark:bg-gray-900"
        },
        {
            name: "Pro Master",
            price: "₹899",
            period: "/month",
            desc: "The ultimate tool for professional content studios.",
            features: [
                "Unlimited Speech Conversions",
                "Unlimited Audio Duration",
                "Exclusive Neural Voice Styles",
                "Instant Voice Cloning (Beta)",
                "Batch File Processing",
                "Dedicated GPU Processing",
                "API Access for Developers"
            ],
            cta: "Upgrade Now",
            popular: true,
            color: "text-indigo-600 dark:text-indigo-400",
            bg: "bg-indigo-600 text-white"
        }
    ];

    const comparison = [
        { feature: "Daily Conversions", free: "10", basic: "100", pro: "Unlimited" },
        { feature: "Max Duration", free: "30 seconds", basic: "5 minutes", pro: "No Limit" },
        { feature: "Voice Styles", free: "Standard Only", basic: "All Standard", pro: "Premium + Styles" },
        { feature: "Processing Speed", free: "Normal", basic: "Fast", pro: "Hyper-Priority" },
        { feature: "History Storage", free: "24 Hours", basic: "30 Days", pro: "Permanent" }
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-950 p-4 lg:p-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto py-20">
                
                {/* Header Section */}
                <div className="text-center space-y-6 mb-20 animate-fade-in">
                    <span className="inline-block px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-black rounded-full uppercase tracking-[0.3em]">Scalable Solutions</span>
                    <h1 className="text-5xl lg:text-7xl font-black text-gray-900 dark:text-gray-100 tracking-tighter leading-none">Upgrade Your Plan</h1>
                    <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto font-medium leading-relaxed">
                        Unlock full neural features and remove all usage limits to empower your linguistic creativity.
                    </p>
                    <button 
                        onClick={() => setShowLimitModal(true)}
                        className="text-[10px] font-black text-indigo-600 uppercase tracking-widest underline decoration-2 underline-offset-4 hover:text-indigo-700 transition"
                    >
                        See Limit Example
                    </button>
                </div>

                {/* Pricing Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-32">
                    {plans.map((plan, idx) => (
                        <div 
                            key={idx}
                            className={`p-10 rounded-[3rem] shadow-sm border ${plan.popular ? 'border-indigo-500 transform lg:scale-105 shadow-2xl shadow-indigo-200 dark:shadow-none bg-indigo-600 text-white' : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800'} flex flex-col justify-between transition-all duration-500 relative overflow-hidden`}
                        >
                            {plan.popular && (
                                <>
                                    <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><FiZap className="text-9xl" /></div>
                                    <div className="absolute top-6 right-10 bg-white text-indigo-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Most Popular</div>
                                </>
                            )}
                            
                            <div className="space-y-8 relative z-10">
                                <h2 className={`text-xs font-black uppercase tracking-[0.2em] ${plan.popular ? 'text-indigo-200' : 'text-gray-400'}`}>{plan.name}</h2>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-black tracking-tighter">{plan.price}</span>
                                    <span className={`text-sm font-bold ${plan.popular ? 'text-indigo-200' : 'text-gray-400'}`}>{plan.period}</span>
                                </div>
                                <p className={`text-sm font-medium leading-relaxed ${plan.popular ? 'text-indigo-100' : 'text-gray-500'}`}>{plan.desc}</p>
                                
                                <div className={`h-[1px] w-full ${plan.popular ? 'bg-indigo-500' : 'bg-gray-100 dark:bg-gray-800'}`}></div>
                                
                                <ul className="space-y-4">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-xs font-bold">
                                            <span className={`p-1.5 rounded-full shrink-0 ${plan.popular ? 'bg-indigo-500 text-white' : 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600'}`}><FiCheck className="text-xs" /></span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button className={`mt-12 w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 ${plan.disabled ? 'bg-gray-50 dark:bg-gray-800 text-gray-300 dark:text-gray-700 cursor-not-allowed' : plan.popular ? 'bg-white text-indigo-600 hover:bg-gray-50' : 'bg-gray-900 dark:bg-black text-white hover:bg-gray-800 shadow-xl'}`}>
                                {plan.cta} {!plan.disabled && <FiArrowRight />}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Feature Comparison Section */}
                <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 lg:p-16 border border-gray-100 dark:border-gray-800 shadow-sm transition-colors overflow-x-auto">
                    <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tighter mb-12 text-center">Plan Comparison</h3>
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="border-b border-gray-100 dark:border-gray-800">
                                <th className="py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Key Features</th>
                                <th className="py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Free</th>
                                <th className="py-6 text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">Basic</th>
                                <th className="py-6 text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Pro Master</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                            {comparison.map((row, i) => (
                                <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition">
                                    <td className="py-6 text-sm font-bold text-gray-800 dark:text-gray-200">{row.feature}</td>
                                    <td className="py-6 text-xs font-bold text-gray-500 dark:text-gray-400">{row.free}</td>
                                    <td className="py-6 text-xs font-bold text-gray-700 dark:text-gray-300">{row.basic}</td>
                                    <td className="py-6 text-xs font-black text-indigo-600 dark:text-indigo-400">{row.pro}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Usage Warning Refined Modal */}
                {showLimitModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
                        <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-[3rem] shadow-2xl p-10 relative border border-gray-100 dark:border-gray-800 animate-scale-up transition-colors">
                            <button 
                                onClick={() => setShowLimitModal(false)}
                                className="absolute top-8 right-8 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
                            >
                                <FiX className="text-xl" />
                            </button>
                            
                            <div className="flex flex-col items-center text-center">
                                {/* Subtle Warning Icon */}
                                <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/20 text-amber-500 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm">
                                    <FiAlertCircle />
                                </div>
                                
                                <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tighter mb-2">Usage Limit Reached</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-8 px-4 leading-relaxed">
                                    You have used all your free speech conversions for today. <br />
                                    <span className="text-red-500 font-black mt-2 inline-block">10 / 10 used</span>
                                </p>

                                {/* Benefits Highlight Section */}
                                <div className="w-full bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-6 mb-10 text-left border border-gray-100 dark:border-gray-800">
                                    <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-4">Why Upgrade Now?</p>
                                    <ul className="space-y-3">
                                        {[
                                            'Unlimited Neural Conversions',
                                            'Faster Processing Priority',
                                            'Premium Neural Voice Styles'
                                        ].map((benefit, i) => (
                                            <li key={i} className="flex items-center gap-3 text-xs font-bold text-gray-700 dark:text-gray-300">
                                                <FiZap className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                                                {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex flex-col w-full gap-3">
                                    <button 
                                        className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-700 transition transform hover:-translate-y-1 active:scale-95 shadow-xl shadow-indigo-100 dark:shadow-none"
                                    >
                                        Upgrade Now
                                    </button>
                                    <button 
                                        onClick={() => setShowLimitModal(false)}
                                        className="w-full py-4 text-gray-400 dark:text-gray-600 font-bold uppercase tracking-widest text-[10px] hover:text-gray-500 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PricingPage;
