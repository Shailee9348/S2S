import React, { useState } from 'react';
import { FiSend, FiArrowRight, FiSmile, FiCheckCircle } from 'react-icons/fi';

const FeedbackPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const emojis = [
        { level: 1, char: "😠", label: "Terrible" },
        { level: 2, char: "🙁", label: "Bad" },
        { level: 3, char: "😐", label: "Okay" },
        { level: 4, char: "🙂", label: "Good" },
        { level: 5, char: "😍", label: "Amazing" }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await fetch("http://localhost:5000/api/v1/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, rating, comment }),
            });

            if (!response.ok) throw new Error("Feedback transmission failed");

            setSuccess(true);
            setName("");
            setEmail("");
            setRating(5);
            setComment("");
        } catch (err) {
            console.error("Feedback Error:", err);
            alert("Signal Error: Unable to transmit feedback. Ensure backend is active.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fcfcff] dark:bg-gray-950 p-4 lg:p-8 transition-colors duration-300 relative overflow-hidden">
            
            {/* Background Blobs */}
            <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-indigo-50 dark:bg-indigo-900/10 rounded-full blur-[100px] animate-float opacity-30"></div>
            
            <div className="max-w-4xl mx-auto py-20 relative z-10">
                
                {/* Header Section */}
                <div className="text-center space-y-6 mb-16 animate-slide-up">
                    <span className="inline-block px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-black rounded-full uppercase tracking-[0.3em]">User Reflection</span>
                    <h1 className="text-5xl lg:text-7xl font-black text-gray-900 dark:text-gray-100 tracking-tighter leading-none transition-colors">Your Voice <br />Shapes Ours.</h1>
                    <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto font-medium leading-relaxed transition-colors">
                        We're refining the neural patterns of OdishaVox every day. Tell us how we can make your experience more exceptional.
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-[3.5rem] p-10 lg:p-16 border border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-500 animate-fade-in relative overflow-hidden">
                    
                    {success ? (
                        <div className="text-center space-y-10 py-10 animate-scale-up">
                            <div className="w-24 h-24 bg-green-50 dark:bg-green-900/20 text-green-500 rounded-[2rem] flex items-center justify-center mx-auto text-5xl shadow-sm border border-green-100 dark:border-green-900/30">
                                <FiCheckCircle />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-4xl font-black text-gray-900 dark:text-gray-100 tracking-tight">Mission Received.</h2>
                                <p className="text-gray-500 dark:text-gray-400 font-bold">Your feedback has been decrypted and sent to our engineering team.</p>
                            </div>
                            <button 
                                onClick={() => setSuccess(false)}
                                className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-700 transition transform hover:-translate-y-1 shadow-xl shadow-indigo-100 dark:shadow-none"
                            >
                                Submit New Fragment
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Identity</label>
                                    <input 
                                        type="text" 
                                        required 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-gray-50/50 dark:bg-gray-800/50 border-none rounded-2xl px-6 py-4 outline-none ring-2 ring-transparent focus:ring-indigo-500/20 dark:focus:ring-indigo-900/30 dark:text-gray-100 font-bold transition-all text-sm" 
                                        placeholder="Full Name" 
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Signal Channel</label>
                                    <input 
                                        type="email" 
                                        required 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-gray-50/50 dark:bg-gray-800/50 border-none rounded-2xl px-6 py-4 outline-none ring-2 ring-transparent focus:ring-indigo-500/20 dark:focus:ring-indigo-900/30 dark:text-gray-100 font-bold transition-all text-sm" 
                                        placeholder="email@example.com" 
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Current Sentiment</label>
                                <div className="flex flex-wrap justify-between items-center gap-4 bg-gray-50/50 dark:bg-gray-800/20 p-6 rounded-3xl border border-gray-50 dark:border-gray-800">
                                    {emojis.map((emoji) => (
                                        <button
                                            key={emoji.level}
                                            type="button"
                                            onClick={() => setRating(emoji.level)}
                                            className={`flex flex-col items-center gap-2 group transition-all duration-300 ${rating === emoji.level ? 'scale-125' : 'opacity-40 grayscale hover:opacity-100 hover:grayscale-0'}`}
                                        >
                                            <span className="text-4xl filter drop-shadow-sm group-hover:drop-shadow-lg transition-all">{emoji.char}</span>
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${rating === emoji.level ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 '}`}>
                                                {emoji.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Detailed Log</label>
                                <textarea 
                                    required 
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="w-full h-40 bg-gray-50/50 dark:bg-gray-800/50 border-none rounded-[2rem] px-6 py-6 outline-none ring-2 ring-transparent focus:ring-indigo-500/20 dark:focus:ring-indigo-900/30 dark:text-gray-100 font-medium transition-all text-sm resize-none" 
                                    placeholder="Describe your encounter with the platform in detail..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-6 rounded-3xl font-black uppercase tracking-widest text-xs transition transform hover:-translate-y-1 active:scale-95 shadow-xl flex items-center justify-center gap-3 ${loading ? 'bg-gray-200 text-gray-400 cursor-wait' : 'bg-gray-900 dark:bg-black text-white hover:bg-black shadow-gray-200 dark:shadow-none'}`}
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2 italic">Transmitting Signal...</span>
                                ) : (
                                    <>Dispatch Feedback <FiSend className="text-lg" /></>
                                )}
                            </button>
                        </form>
                    )}
                </div>

                {/* Footer Insight */}
                <div className="mt-12 text-center text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] flex items-center justify-center gap-3 opacity-60">
                    <FiSmile /> Your identity and data are encrypted end-to-end
                </div>
            </div>
        </div>
    );
};

export default FeedbackPage;
