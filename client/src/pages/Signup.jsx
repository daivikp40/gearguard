import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Wrench, ArrowRight, Lock, Mail, User } from 'lucide-react';
import { API_URL } from '../config';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match");
        }

        setLoading(true);
        try {
            await axios.post(`${API_URL}/auth/register`, {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });
            alert("Account created successfully! Please login.");
            navigate("/login");
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Error creating account");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-login">
            {/* Reduced padding (p-6) to make card smaller */}
            <div className="glass-card w-full max-w-md rounded-2xl p-6 md:p-8 relative overflow-hidden">

                {/* Background Blobs */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>

                <div className="relative z-10">
                    {/* Header: Made tighter (mb-4 instead of mb-8) */}
                    <div className="flex justify-center mb-4">
                        <div className="bg-white p-2.5 rounded-xl shadow-lg">
                            <Wrench className="text-blue-600 h-7 w-7" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">Join GearGuard</h2>
                    <p className="text-center text-gray-500 mb-6 text-sm">Create your account to get started</p>

                    {/* Form: Reduced vertical spacing (space-y-3) */}
                    <form onSubmit={handleSignup} className="space-y-3">

                        {/* Username */}
                        <div className="group">
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input
                                    type="text"
                                    name="username"
                                    className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="group">
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="group">
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input
                                    type="password"
                                    name="password"
                                    className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="group">
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-600 text-xs py-2 px-4 rounded-lg text-center animate-pulse">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 text-sm"
                        >
                            {loading ? "Creating..." : "Create Account"}
                            {!loading && <ArrowRight size={18} />}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?
                        <Link to="/login" className="text-blue-600 font-bold hover:text-blue-700 ml-1 hover:underline">
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;