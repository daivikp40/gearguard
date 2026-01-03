import { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { Mail, ArrowRight, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${API_URL}/auth/forgot-password`, { email });
            setMessage("Link sent! Check your email (and spam).");
        } catch (err) {
            setMessage("Error: User not found.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-login">
            {/* Glass Card */}
            <div className="glass-card w-full max-w-md rounded-2xl p-8 md:p-10 relative overflow-hidden">

                {/* Blobs */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>

                <div className="relative z-10">
                    <div className="flex justify-center mb-6">
                        <div className="bg-white p-3 rounded-xl shadow-lg">
                            <Wrench className="text-blue-600 h-8 w-8" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Reset Password</h2>
                    <p className="text-center text-gray-500 mb-8">Enter your email to receive a reset link</p>

                    {message && (
                        <div className={`text-sm py-2 px-4 rounded-lg flex items-center justify-center mb-4 ${message.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="group">
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? "Sending..." : "Send Reset Link"}
                            {!loading && <ArrowRight size={20} />}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link to="/login" className="text-sm text-gray-500 hover:text-gray-800">
                            ← Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ForgotPassword;