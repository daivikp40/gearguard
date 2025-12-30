import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { User, Bell, Shield, Save, LogOut, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const navigate = useNavigate();

    // Get user from local storage
    const user = JSON.parse(localStorage.getItem("user")) || { username: "Admin", email: "admin@gearguard.com" };

    // Fake state for toggles
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            alert("Settings saved successfully!");
        }, 1000);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 ml-64 p-8">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>
                    <p className="text-gray-500 mt-1">Manage your profile and application preferences</p>
                </div>

                <div className="max-w-4xl space-y-6">

                    {/* 1. Profile Card */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                            <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                                <User size={24} />
                            </div>
                            <h2 className="text-lg font-bold text-gray-800">Profile Information</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
                                <input
                                    type="text"
                                    defaultValue={user.username}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    defaultValue={user.email}
                                    disabled
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
                                />
                                <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                            </div>
                        </div>
                    </div>

                    {/* 2. Preferences */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                            <div className="bg-purple-50 p-2 rounded-lg text-purple-600">
                                <Bell size={24} />
                            </div>
                            <h2 className="text-lg font-bold text-gray-800">Preferences</h2>
                        </div>

                        <div className="space-y-6">
                            {/* Toggle 1 */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-800">Email Notifications</p>
                                    <p className="text-sm text-gray-500">Receive updates about new maintenance requests</p>
                                </div>
                                <button
                                    onClick={() => setNotifications(!notifications)}
                                    className={`w-12 h-6 rounded-full p-1 transition-colors ${notifications ? 'bg-blue-600' : 'bg-gray-300'}`}
                                >
                                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${notifications ? 'translate-x-6' : 'translate-x-0'}`} />
                                </button>
                            </div>

                            {/* Toggle 2 */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-800">Dark Mode</p>
                                    <p className="text-sm text-gray-500">Switch between light and dark themes</p>
                                </div>
                                <button
                                    onClick={() => setDarkMode(!darkMode)}
                                    className={`w-12 h-6 rounded-full p-1 transition-colors ${darkMode ? 'bg-blue-600' : 'bg-gray-300'}`}
                                >
                                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 3. Security & Actions */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                            <div className="bg-red-50 p-2 rounded-lg text-red-600">
                                <Shield size={24} />
                            </div>
                            <h2 className="text-lg font-bold text-gray-800">Security & Actions</h2>
                        </div>

                        <div className="space-y-4">
                            <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex justify-between items-center group">
                                <span className="font-medium text-gray-700">Change Password</span>
                                <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
                            </button>

                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-3 border border-red-100 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2"
                            >
                                <LogOut size={18} />
                                <span className="font-medium">Sign Out</span>
                            </button>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end pt-4">
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium shadow-sm flex items-center gap-2 transition-all active:scale-95"
                        >
                            {loading ? "Saving..." : <><Save size={20} /> Save Changes</>}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Settings;