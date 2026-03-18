import React, { useState } from 'react';
import { FiPlus, FiMinus, FiSearch, FiHelpCircle, FiChevronRight } from 'react-icons/fi';

const FAQPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "What exactly is OdishaVox?",
            answer: "OdishaVox is a high-performance neural speech platform specifically fine-tuned for the Odia language. We provide professional-grade Text-to-Speech (TTS), Speech-to-Text (STT), and Speech-to-Speech (S2S) translation services with localized dialect support."
        },
        {
            question: "How accurate is the Odia voice synthesis?",
            answer: "Our neural engines are trained on over 10,000 hours of high-quality Odia recordings. We achieve an industry-leading MOS (Mean Opinion Score) that captures the unique emotional tonality and phonetic nuances of the region."
        },
        {
            question: "Is my voice data secure and private?",
            answer: "Yes. All processing is handled through enterprise-grade encrypted channels. We do not store your raw audio data unless explicitly requested for training purposes, and our platform is GDPR and SOC2 compliant."
        },
        {
            question: "Do you support real-time translation?",
            answer: "Our Speech-to-Speech (S2S) engine supports near-instant translation with a latency of less than 300ms, making it suitable for live broadcasts, customer support, and interactive voice response systems."
        },
        {
            question: "What happens when I reach my free usage limit?",
            answer: "The Free Explorer plan includes 10 neural conversions per day. Once reached, you will see a 'Usage Limit' notification. You can then choose to wait until the next day or upgrade to a Basic or Pro plan for higher limits."
        },
        {
            question: "Can I use OdishaVox for commercial projects?",
            answer: "Commercial rights are included in our 'Basic Neural' and 'Pro Master' plans. Free tier users are restricted to non-commercial, personal use only."
        }
    ];

    const filteredFaqs = faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-[#fcfcff] dark:bg-gray-950 p-4 lg:p-8 transition-colors duration-300 relative overflow-hidden">
            
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-50/50 dark:bg-indigo-900/5 rounded-full blur-[120px] animate-float opacity-30"></div>
            
            <div className="max-w-4xl mx-auto py-20 relative z-10">
                
                {/* Header Section */}
                <div className="text-center space-y-6 mb-20 animate-slide-up">
                    <span className="inline-block px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-black rounded-full uppercase tracking-[0.3em]">Knowledge Base</span>
                    <h1 className="text-5xl lg:text-7xl font-black text-gray-900 dark:text-gray-100 tracking-tighter leading-none mb-8">Common <br />Questions.</h1>
                    
                    {/* Search Bar */}
                    <div className="relative max-w-xl mx-auto group">
                        <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-indigo-600 transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Search the neural archive..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl py-5 pl-16 pr-6 shadow-xl shadow-indigo-500/5 outline-none focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-900/20 dark:text-gray-100 font-bold transition-all"
                        />
                    </div>
                </div>

                {/* FAQ Accordion List */}
                <div className="space-y-4 animate-fade-in [animation-delay:0.3s]">
                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((faq, index) => (
                            <div 
                                key={index} 
                                className={`bg-white dark:bg-gray-900 rounded-[2.5rem] border transition-all duration-500 overflow-hidden ${activeIndex === index ? 'border-indigo-600 shadow-2xl shadow-indigo-500/10' : 'border-gray-50 dark:border-gray-800 shadow-sm'}`}
                            >
                                <button 
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full text-left p-8 flex items-center justify-between group"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all duration-500 ${activeIndex === index ? 'bg-indigo-600 text-white' : 'bg-gray-50 dark:bg-gray-800 text-gray-400'}`}>
                                            <FiHelpCircle />
                                        </div>
                                        <h3 className={`text-lg font-black tracking-tight transition-colors ${activeIndex === index ? 'text-indigo-600' : 'text-gray-900 dark:text-gray-100 hover:text-indigo-600'}`}>
                                            {faq.question}
                                        </h3>
                                    </div>
                                    <div className={`text-2xl transition-transform duration-500 ${activeIndex === index ? 'rotate-180 text-indigo-600' : 'text-gray-300'}`}>
                                        {activeIndex === index ? <FiMinus /> : <FiPlus />}
                                    </div>
                                </button>
                                
                                <div 
                                    className={`transition-all duration-500 ease-in-out ${activeIndex === index ? 'max-h-[300px] opacity-100 py-8 px-10' : 'max-h-0 opacity-0'}`}
                                >
                                    <div className="pl-16 pr-8">
                                        <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed border-l-4 border-indigo-100 dark:border-indigo-900/30 pl-6 py-2">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800">
                             <p className="text-gray-400 font-black uppercase tracking-[0.2em]">No results found for "{searchTerm}"</p>
                        </div>
                    )}
                </div>

                {/* Footer Insight */}
                <div className="mt-20 flex flex-col items-center gap-8 animate-fade-in [animation-delay:0.6s]">
                    <div className="p-8 bg-indigo-600 text-white rounded-[3rem] shadow-xl shadow-indigo-200 dark:shadow-none w-full flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
                         <div className="absolute top-0 right-0 p-8 opacity-10"><FiHelpCircle className="text-8xl" /></div>
                         <div className="relative z-10 text-center md:text-left">
                            <h4 className="text-xl font-black tracking-tight">Still have unanswered questions?</h4>
                            <p className="text-indigo-100 font-medium mt-1">Our neural support specialists are ready to decrypt your queries.</p>
                         </div>
                         <button className="px-10 py-5 bg-white text-indigo-600 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-50 transition shadow-lg shrink-0">
                            Contact Support
                         </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQPage;
