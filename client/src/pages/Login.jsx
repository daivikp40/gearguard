import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Wrench, ArrowRight, Lock, Mail } from 'lucide-react';
import { API_URL } from '../config'; // Add import

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(false);
        setLoading(true);
        try {
            // Use your local URL or API_URL
            const res = await axios.post(`${API_URL}/auth/login`, { email, password });
            localStorage.setItem("user", JSON.stringify(res.data));
            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        // 1. ANIMATED BACKGROUND CONTAINER
        <div className="min-h-screen flex items-center justify-center p-4 bg-login">
            {/* 2. GLASS CARD */}
            <div className="glass-card w-full max-w-md rounded-2xl p-8 md:p-10 relative overflow-hidden">

                {/* Decorative Circle Effect */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>

                <div className="relative z-10">
                    <div className="flex justify-center mb-8">
                        <div className="bg-white p-3 rounded-xl shadow-lg">
                            <Wrench className="text-blue-600 h-8 w-8" />
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome Back</h2>
                    <p className="text-center text-gray-500 mb-8">Enter your credentials to access GearGuard</p>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="group">
                            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                                <input
                                    type="email"
                                    className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                                <input
                                    type="password"
                                    className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-600 text-sm py-2 px-4 rounded-lg flex items-center justify-center animate-pulse">
                                Invalid email or password.
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            {loading ? "Signing In..." : "Sign In"}
                            {!loading && <ArrowRight size={20} />}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-600">
                        Don't have an account?
                        <Link to="/signup" className="text-blue-600 font-bold hover:text-blue-700 ml-1 hover:underline">
                            Create Account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;