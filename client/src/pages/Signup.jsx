import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Wrench, User, Mail, Lock, ArrowRight } from 'lucide-react';
import { API_URL } from '../config'; // Add import

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${API_URL}/auth/register`, formData);
            alert("Account created successfully!");
            navigate("/login");
        } catch (err) {
            console.error(err);
            // Check for Duplicate Email Error (11000)
            if (err.response && err.response.data && err.response.data.code === 11000) {
                alert("This email is already registered! Please Log In.");
                navigate("/login");
            } else {
                alert("Error creating account. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        // UPDATED CLASS HERE 👇
        <div className="min-h-screen flex items-center justify-center p-4 bg-login">
            <div className="glass-card w-full max-w-md rounded-2xl p-8 md:p-10 relative overflow-hidden">

                <div className="relative z-10">
                    <div className="flex justify-center mb-6">
                        <div className="bg-white p-3 rounded-xl shadow-lg">
                            <Wrench className="text-blue-600 h-8 w-8" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Join GearGuard</h2>
                    <p className="text-center text-gray-500 mb-8">Start managing your equipment professionally</p>

                    <form onSubmit={handleSignup} className="space-y-4">
                        <div className="relative group">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500" size={20} />
                            <input
                                type="text"
                                className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="Full Name"
                                onChange={e => setFormData({ ...formData, username: e.target.value })}
                                required
                            />
                        </div>
                        <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500" size={20} />
                            <input
                                type="email"
                                className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="Email Address"
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500" size={20} />
                            <input
                                type="password"
                                className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="Create Password"
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 mt-4"
                        >
                            {loading ? "Creating Account..." : "Sign Up"}
                            {!loading && <ArrowRight size={20} />}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-600">
                        Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Log in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;