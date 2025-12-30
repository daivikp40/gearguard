import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';

const CalendarView = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await axios.get("http://localhost:5000/api/maintenance");
            // Simple sort by date
            const sorted = res.data.sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate));
            setTasks(sorted);
        };
        fetchTasks();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 ml-64 p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <CalendarIcon className="text-blue-600" /> Maintenance Schedule
                    </h1>
                    <p className="text-gray-500">Upcoming maintenance tasks ordered by date</p>
                </div>

                <div className="space-y-4">
                    {tasks.map(task => (
                        <div key={task._id} className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-6">
                                <div className="text-center bg-blue-50 px-4 py-2 rounded-lg border border-blue-100 min-w-[100px]">
                                    <div className="text-sm text-blue-600 font-bold uppercase">
                                        {task.scheduledDate ? new Date(task.scheduledDate).toLocaleString('default', { month: 'short' }) : 'N/A'}
                                    </div>
                                    <div className="text-2xl font-bold text-gray-800">
                                        {task.scheduledDate ? new Date(task.scheduledDate).getDate() : '--'}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {task.scheduledDate ? new Date(task.scheduledDate).getFullYear() : ''}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 text-lg">{task.subject}</h3>
                                    <p className="text-gray-500">{task.equipment}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${task.type === 'Preventive' ? 'bg-purple-50 text-purple-700' : 'bg-orange-50 text-orange-700'
                                    }`}>
                                    {task.type}
                                </span>
                                <div className="flex items-center gap-1 text-gray-400 text-sm">
                                    <Clock size={16} />
                                    <span>{task.duration} hrs</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CalendarView;