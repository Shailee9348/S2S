import React from 'react';
import { FiMail, FiPhone, FiMapPin, FiTwitter, FiGithub, FiArrowRight, FiMessageSquare } from 'react-icons/fi';

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-950 p-4 lg:p-8 transition-colors duration-300 overflow-hidden">
            <div className="max-w-7xl mx-auto py-20 px-4">
                
                {/* Header Section */}
                <div className="text-center space-y-6 mb-20">
                    <span className="inline-block px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-black rounded-full uppercase tracking-[0.3em]">Neural Support</span>
                    <h1 className="text-5xl lg:text-7xl font-black text-gray-900 dark:text-gray-100 tracking-tighter leading-none transition-colors">Get in <br />Neural Touch.</h1>
                    <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto font-medium leading-relaxed transition-colors">
                        Our engineering team is ready to assist with custom integrations, technical support, or project partnerships.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* Left: Contact Info */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="bg-white dark:bg-gray-900 p-10 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
                            <h2 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-8">Direct Channels</h2>
                            <div className="space-y-8">
                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                        <FiMail />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Support Email</p>
                                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-tighter">hi@odishavox.ai</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                        <FiMessageSquare />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">General Inquiries</p>
                                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Bhubaneswar, Odisha (HQ)</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                        <FiTwitter />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Social Media</p>
                                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200">@OdishaVoxPlatform</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Secondary Card */}
                        <div className="bg-indigo-600 p-10 rounded-[2.5rem] text-white shadow-xl shadow-indigo-100 dark:shadow-none transition-all">
                             <h3 className="text-3xl font-black mb-4 tracking-tighter">Bespoke Solutions?</h3>
                             <p className="text-indigo-100 text-sm font-medium mb-8 leading-relaxed">Need custom dialect training for your enterprise? Our researchers specialize in localized model fine-tuning.</p>
                             <button className="flex items-center gap-3 bg-white text-indigo-600 px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-gray-50 transition">
                                Request Partnership
                             </button>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="lg:col-span-7">
                         <div className="bg-white dark:bg-gray-900 p-10 lg:p-14 rounded-[3rem] shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
                             <h2 className="text-3xl font-black text-gray-900 dark:text-gray-100 mb-10 tracking-tighter">Send an Encrypted Message</h2>
                             <form className="space-y-6">
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                     <div className="space-y-2">
                                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                         <input type="text" className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-6 py-4 outline-none ring-1 ring-gray-100 dark:ring-gray-700 focus:ring-2 focus:ring-indigo-500 dark:text-gray-200 text-sm font-bold transition" placeholder="Abinash Mohanty" />
                                     </div>
                                     <div className="space-y-2">
                                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                         <input type="email" className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-6 py-4 outline-none ring-1 ring-gray-100 dark:ring-gray-700 focus:ring-2 focus:ring-indigo-500 dark:text-gray-200 text-sm font-bold transition" placeholder="name@domain.com" />
                                     </div>
                                 </div>
                                 <div className="space-y-2">
                                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                                     <select className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-6 py-4 outline-none ring-1 ring-gray-100 dark:ring-gray-700 focus:ring-2 focus:ring-indigo-500 dark:text-gray-200 text-sm font-bold transition">
                                         <option>Technical Support</option>
                                         <option>Integration API</option>
                                         <option>Custom Dialect Research</option>
                                         <option>Billing & Subscription</option>
                                     </select>
                                 </div>
                                 <div className="space-y-2">
                                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Message Brief</label>
                                     <textarea className="w-full h-40 bg-gray-50 dark:bg-gray-800 border-none rounded-3xl px-6 py-4 outline-none ring-1 ring-gray-100 dark:ring-gray-700 focus:ring-2 focus:ring-indigo-500 dark:text-gray-200 text-sm font-bold transition resize-none" placeholder="Describe your request in detail..."></textarea>
                                 </div>
                                 <button type="submit" className="w-full py-5 bg-gray-900 dark:bg-black text-white rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-gray-800 transition transform hover:-translate-y-1 active:scale-95 shadow-lg flex items-center justify-center gap-3">
                                     Dispatch Mission <FiArrowRight />
                                 </button>
                             </form>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
