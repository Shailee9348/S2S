import React from 'react';
import { FiGithub, FiTwitter, FiLinkedin, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Footer = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    return (
        <footer className="w-full bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 mt-auto py-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">OdishaVox</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                            Pioneering voice intelligence for the Odia language. Powered by advanced AI.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <FiGithub className="w-5 h-5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition" />
                            <FiTwitter className="w-5 h-5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition" />
                            <FiLinkedin className="w-5 h-5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition" />
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-6 uppercase tracking-widest text-xs">Platform</h3>
                        <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                            <li><button onClick={() => navigate('/')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Home</button></li>
                            <li><button onClick={() => navigate('/about')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">About Project</button></li>
                            <li><button onClick={() => navigate('/pricing')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Pricing Plans</button></li>
                            {isLoggedIn && (
                                <>
                                    <li><button onClick={() => navigate('/workbench')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Workbench Hub</button></li>
                                    <li><button onClick={() => navigate('/history')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">History Log</button></li>
                                </>
                            )}
                            <li><button onClick={() => navigate('/feedback')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Feedback</button></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-6 uppercase tracking-widest text-xs">Support</h3>
                        <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                            <li><button onClick={() => navigate('/faq')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition text-left">Frequently Asked Questions</button></li>
                            <li><button onClick={() => navigate('/contact')} className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition text-left"><FiMapPin className="text-indigo-600 dark:text-indigo-400" /> Bhubaneswar, Odisha (HQ)</button></li>
                            <li><button onClick={() => navigate('/contact')} className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition text-left"><FiPhone className="text-indigo-600 dark:text-indigo-400" /> Technical Support</button></li>
                            <li><button onClick={() => navigate('/contact')} className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition text-left"><FiMail className="text-indigo-600 dark:text-indigo-400" /> hi@odishavox.ai</button></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-6 uppercase tracking-widest text-xs">Legal</h3>
                        <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                            <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Terms of Use</a></li>
                            <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">License</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 dark:text-gray-600">
                    <p>© 2026 OdishaVox Speech Platform. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0 font-bold uppercase tracking-tighter">
                        <span>MIT License</span>
                        <span>v1.0.4-beta</span>
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                            <FiGithub /> Repository
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;