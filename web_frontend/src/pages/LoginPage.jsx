import React, { useState } from 'react';
import { FiMail, FiLock, FiArrowRight, FiGithub, FiEye, FiEyeOff } from 'react-icons/fi';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await login(email, password);
        setLoading(false);
        if (result.success) {
            navigate('/');
        } else {
            alert(result.error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4 transition-colors duration-300">
            <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-3xl shadow-xl overflow-hidden animate-fade-in border border-transparent dark:border-gray-800">
                <div className="bg-indigo-600 p-8 text-white text-center">
                    <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                    <p className="text-indigo-100 italic">Sign in to continue your voice journey.</p>
                </div>
                
                <div className="p-8 space-y-6">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                            <div className="relative">
                                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="email" 
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700 dark:text-gray-200 transition"
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Password</label>
                        <div className="relative">
                            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input 
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl py-3 pl-12 pr-12 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700 dark:text-gray-200 transition"
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition p-1"
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="rounded text-indigo-600 dark:bg-gray-800 dark:border-gray-700" />
                                <span className="text-gray-500 dark:text-gray-400">Remember me</span>
                            </label>
                            <a href="#" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">Forgot password?</a>
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 text-white rounded-xl py-4 font-bold text-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 dark:shadow-none flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loading ? "Verifying..." : "Sign In"} <FiArrowRight />
                        </button>
                    </form>

                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100 dark:border-gray-800"></div></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-gray-900 px-4 text-gray-400 font-bold">Or continue with</span></div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <button className="flex items-center justify-center py-3 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition text-red-500 hover:border-red-100 dark:hover:border-red-900/30">
                            <FaGoogle className="text-xl" />
                        </button>
                        <button className="flex items-center justify-center py-3 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition text-blue-600 hover:border-blue-100 dark:hover:border-blue-900/30">
                            <FaFacebookF className="text-xl" />
                        </button>
                        <button className="flex items-center justify-center py-3 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition text-gray-900 dark:text-gray-100 hover:border-gray-300 dark:hover:border-gray-600">
                            <FiGithub className="text-xl" />
                        </button>
                    </div>

                    <p className="text-center text-gray-500 dark:text-gray-400 mt-8 text-sm">
                        Don't have an account? <button onClick={() => navigate('/register')} className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">Register</button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
