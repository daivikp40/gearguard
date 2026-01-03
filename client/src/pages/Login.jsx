import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Wrench, ArrowRight, Lock, Mail } from 'lucide-react';
import { API_URL } from '../config';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            // Send the token to your backend
            const res = await axios.post(`${API_URL}/auth/google`, {
                googleToken: credentialResponse.credential
            });

            // Handle login success
            localStorage.setItem("user", JSON.stringify(res.data));
            navigate("/dashboard");
        } catch (err) {
            console.log("Google Login Error:", err);
            setError(true);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(false);
        setLoading(true);
        try {
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
        <div className="min-h-screen flex items-center justify-center p-4 bg-login">
            {/* GLASS CARD */}
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
                                Login Failed. Please check credentials or try Google.
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

                    {/* --- GOOGLE LOGIN SECTION --- */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white/50 text-gray-500 backdrop-blur-sm rounded">Or continue with</span>
                        </div>
                    </div>

                    <div className="flex justify-center w-full">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => {
                                console.log('Google Login Failed');
                                setError(true);
                            }}
                            theme="filled_blue"
                            shape="pill"
                        // Removed width="100%" to make it standard size
                        />
                    </div>
                    {/* --------------------------- */}

                    <div className="mt-8 text-center text-sm text-gray-600 flex flex-col gap-2">
                        <div>
                            <Link to="/forgot-password" className="text-gray-500 hover:text-gray-800 transition-colors">
                                Forgot Password?
                            </Link>
                        </div>
                        <div>
                            Don't have an account?
                            <Link to="/signup" className="text-blue-600 font-bold hover:text-blue-700 ml-1 hover:underline">
                                Create Account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;