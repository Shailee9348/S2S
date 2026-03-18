import React, { useState } from 'react';
import { FiUser, FiMail, FiCalendar, FiSettings, FiLogOut, FiX, FiCheck } from 'react-icons/fi';

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
        name: "Odisha User",
        email: "user@odishavox.com",
        joinedDate: "March 2024",
        usageStats: {
            sts: 12,
            stt: 45,
            tts: 8
        }
    });

    const [editData, setEditData] = useState({ ...user });

    const handleSave = () => {
        setUser({ ...user, name: editData.name, email: editData.email });
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 relative">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-indigo-600 h-32 relative">
                        <div className="absolute -bottom-12 left-8">
                            <div className="w-24 h-24 bg-white rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                                <FiUser className="text-4xl text-indigo-600" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-16 pb-8 px-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                                <p className="text-gray-500 flex items-center gap-2 mt-1">
                                    <FiMail className="text-indigo-400" /> {user.email}
                                </p>
                            </div>
                            <button 
                                onClick={() => setIsEditing(true)}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl transition flex items-center gap-2"
                            >
                                <FiSettings /> Edit Profile
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                            <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                                <h3 className="text-indigo-700 font-bold mb-1">STT Usage</h3>
                                <p className="text-3xl font-bold text-gray-800">{user.usageStats.stt}</p>
                                <p className="text-xs text-indigo-500 mt-1">Transcriptions completed</p>
                            </div>
                            <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                                <h3 className="text-green-700 font-bold mb-1">STS Usage</h3>
                                <p className="text-3xl font-bold text-gray-800">{user.usageStats.sts}</p>
                                <p className="text-xs text-green-500 mt-1">Conversations translated</p>
                            </div>
                            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                                <h3 className="text-blue-700 font-bold mb-1">TTS Usage</h3>
                                <p className="text-3xl font-bold text-gray-800">{user.usageStats.tts}</p>
                                <p className="text-xs text-blue-500 mt-1">Speech generations</p>
                            </div>
                        </div>

                        <div className="mt-12 space-y-4">
                            <h2 className="text-xl font-bold text-gray-800">Account Details</h2>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <FiCalendar className="text-gray-400" />
                                <div>
                                    <p className="text-xs text-gray-400">Member Since</p>
                                    <p className="text-gray-700 font-medium">{user.joinedDate}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 border-t border-gray-100 pt-8 flex justify-end">
                            <button className="text-red-500 hover:bg-red-50 px-6 py-2 rounded-xl transition flex items-center gap-2 font-semibold">
                                <FiLogOut /> Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-fade-in overflow-hidden">
                        <div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
                            <h3 className="text-xl font-bold">Edit Profile</h3>
                            <button onClick={() => setIsEditing(false)} className="hover:rotate-90 transition duration-300">
                                <FiX className="text-2xl" />
                            </button>
                        </div>
                        <div className="p-8 space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Display Name</label>
                                <input 
                                    type="text" 
                                    value={editData.name}
                                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                <input 
                                    type="email" 
                                    value={editData.email}
                                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                />
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button 
                                    onClick={() => setIsEditing(false)}
                                    className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleSave}
                                    className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
                                >
                                    <FiCheck /> Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
