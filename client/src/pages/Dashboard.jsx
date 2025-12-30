import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LayoutDashboard, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { API_URL } from '../config'; // Add import

const Dashboard = () => {
    // 1. Initialize the navigation hook
    const navigate = useNavigate();

    // State for Counts
    const [stats, setStats] = useState({ new: 0, inProgress: 0, repaired: 0, overdue: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const statsRes = await axios.get(`${API_URL}/maintenance/stats/counts`);
                const tasksRes = await axios.get(`${API_URL}/maintenance`);
                setStats(statsRes.data);
            } catch (err) {
                console.error("Error fetching stats:", err);
            }
        };
        fetchStats();
    }, []);

    // Chart Data
    const chartData = [
        { name: 'New', count: stats.new, color: '#3B82F6' },
        { name: 'In Progress', count: stats.inProgress, color: '#EAB308' },
        { name: 'Repaired', count: stats.repaired, color: '#22C55E' },
        { name: 'Overdue', count: stats.overdue, color: '#EF4444' },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            {/* ml-0 on mobile, ml-64 on desktop. p-4 on mobile, p-8 on desktop */}
            <div className="flex-1 w-full ml-0 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 transition-all">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Executive Dashboard</h1>
                    <p className="text-gray-500">Real-time overview of maintenance operations</p>
                </div>

                {/* 2. Summary Cards (Now Clickable with Hover Effects) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                    {/* New Requests Card */}
                    <div
                        onClick={() => navigate('/maintenance')}
                        className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all hover:border-blue-300"
                    >
                        <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                            <LayoutDashboard size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">New Requests</p>
                            <h3 className="text-2xl font-bold text-gray-800">{stats.new}</h3>
                        </div>
                    </div>

                    {/* In Progress Card */}
                    <div
                        onClick={() => navigate('/maintenance')}
                        className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all hover:border-yellow-300"
                    >
                        <div className="p-3 bg-yellow-50 rounded-lg text-yellow-600">
                            <Clock size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">In Progress</p>
                            <h3 className="text-2xl font-bold text-gray-800">{stats.inProgress}</h3>
                        </div>
                    </div>

                    {/* Repaired Card */}
                    <div
                        onClick={() => navigate('/maintenance')}
                        className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all hover:border-green-300"
                    >
                        <div className="p-3 bg-green-50 rounded-lg text-green-600">
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Completed</p>
                            <h3 className="text-2xl font-bold text-gray-800">{stats.repaired}</h3>
                        </div>
                    </div>

                    {/* Overdue Card */}
                    <div
                        onClick={() => navigate('/maintenance')}
                        className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all hover:border-red-300"
                    >
                        <div className="p-3 bg-red-50 rounded-lg text-red-600">
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Critical / Overdue</p>
                            <h3 className="text-2xl font-bold text-gray-800">{stats.overdue}</h3>
                        </div>
                    </div>
                </div>

                {/* 3. The Chart (Visual Overview) */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-800 mb-6">Workload Analysis</h2>
                    <div style={{ width: '100%', height: '350px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={60}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;