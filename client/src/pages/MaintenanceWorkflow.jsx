import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Search, Plus, Play, CheckCircle } from 'lucide-react'; // Added Icons
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config'; // Add import

const MaintenanceWorkflow = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch Tasks
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await axios.get(`${API_URL}/maintenance`);
            setTasks(res.data);
        } catch (err) {
            console.error("Error fetching tasks:", err);
        }
    };

    // --- NEW: Live Update Function ---
    const handleStatusUpdate = async (taskId, newStage, e) => {
        // 1. Stop the card click event (so it doesn't open the edit page)
        e.stopPropagation();

        // 2. Optimistic Update (Move card immediately on screen)
        const updatedTasks = tasks.map(task =>
            task._id === taskId ? { ...task, stage: newStage } : task
        );
        setTasks(updatedTasks);

        // 3. Send update to Backend
        try {
            await axios.put(`${API_URL}/maintenance/${taskId}`, { stage: newStage });
        } catch (err) {
            console.error("Failed to update status", err);
            alert("Failed to save status. Reverting...");
            fetchTasks(); // Revert on error
        }
    };

    // Filter Logic
    const filteredTasks = tasks.filter(task => {
        const term = searchTerm.toLowerCase();
        const subject = task.subject?.toLowerCase() || "";
        const equipment = task.equipment?.toLowerCase() || "";
        return subject.includes(term) || equipment.includes(term);
    });

    const getCount = (stage) => filteredTasks.filter(t => t.stage === stage).length;

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            {/* ml-0 on mobile, ml-64 on desktop. p-4 on mobile, p-8 on desktop */}
            <div className="flex-1 w-full ml-0 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 transition-all">
                {/* Header */}
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Maintenance Workflow</h1>
                        <p className="text-gray-500 mt-1">Manage active jobs and assignments</p>
                    </div>
                    <button
                        onClick={() => navigate('/maintenance/new')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-medium shadow-sm transition-all"
                    >
                        <Plus size={20} />
                        <span>New Request</span>
                    </button>
                </div>

                {/* Search Bar */}
                <div className="mb-8 max-w-md relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* --- KANBAN BOARD --- */}
                <div className="flex gap-6 overflow-x-auto pb-4 items-start">

                    {/* New Column */}
                    <div className="flex-1 min-w-[300px] bg-gray-100 rounded-xl p-4 border border-gray-200">
                        <h2 className="font-bold text-gray-700 mb-4 flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-blue-500"></span> New
                            </span>
                            <span className="bg-white px-2 py-0.5 rounded-md text-xs border shadow-sm">
                                {getCount('New')}
                            </span>
                        </h2>
                        <div className="space-y-3">
                            {filteredTasks.filter(t => t.stage === 'New').map(task => (
                                <TaskCard
                                    key={task._id}
                                    task={task}
                                    navigate={navigate}
                                    onStatusUpdate={handleStatusUpdate} // Pass function down
                                />
                            ))}
                            {getCount('New') === 0 && <p className="text-center text-gray-400 text-sm py-4">No new tasks</p>}
                        </div>
                    </div>

                    {/* In Progress Column */}
                    <div className="flex-1 min-w-[300px] bg-gray-100 rounded-xl p-4 border border-gray-200">
                        <h2 className="font-bold text-gray-700 mb-4 flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-yellow-500"></span> In Progress
                            </span>
                            <span className="bg-white px-2 py-0.5 rounded-md text-xs border shadow-sm">
                                {getCount('In Progress')}
                            </span>
                        </h2>
                        <div className="space-y-3">
                            {filteredTasks.filter(t => t.stage === 'In Progress').map(task => (
                                <TaskCard
                                    key={task._id}
                                    task={task}
                                    navigate={navigate}
                                    onStatusUpdate={handleStatusUpdate}
                                />
                            ))}
                            {getCount('In Progress') === 0 && <p className="text-center text-gray-400 text-sm py-4">No active tasks</p>}
                        </div>
                    </div>

                    {/* Completed Column */}
                    <div className="flex-1 min-w-[300px] bg-gray-100 rounded-xl p-4 border border-gray-200">
                        <h2 className="font-bold text-gray-700 mb-4 flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-green-500"></span> Completed
                            </span>
                            <span className="bg-white px-2 py-0.5 rounded-md text-xs border shadow-sm">
                                {getCount('Repaired')}
                            </span>
                        </h2>
                        <div className="space-y-3">
                            {filteredTasks.filter(t => t.stage === 'Repaired').map(task => (
                                <TaskCard
                                    key={task._id}
                                    task={task}
                                    navigate={navigate}
                                    onStatusUpdate={handleStatusUpdate}
                                />
                            ))}
                            {getCount('Repaired') === 0 && <p className="text-center text-gray-400 text-sm py-4">No completed tasks</p>}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

// --- UPDATED TASK CARD WITH BUTTONS ---
const TaskCard = ({ task, navigate, onStatusUpdate }) => {
    if (!task) return null;

    return (
        <div
            onClick={() => navigate(`/maintenance/${task._id}`)}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-all hover:border-blue-400 group"
        >
            {/* Status Chip */}
            <div className="flex justify-between items-start mb-2">
                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded tracking-wider ${task.type === 'Preventive' ? 'bg-indigo-50 text-indigo-600' : 'bg-orange-50 text-orange-600'
                    }`}>
                    {task.type || "General"}
                </span>

                {task.priority === 'High' && (
                    <span className="w-2 h-2 rounded-full bg-red-500" title="High Priority"></span>
                )}
            </div>

            {/* Subject */}
            <h3 className="font-bold text-gray-900 mb-1 leading-tight">
                {task.subject || "Untitled Task"}
            </h3>

            {/* Equipment */}
            <p className="text-xs text-gray-500 font-medium mb-3">
                {task.equipment || "Unknown Equipment"}
            </p>

            {/* --- ACTION BUTTONS --- */}
            <div className="mt-3 pt-3 border-t border-gray-100">
                {task.stage === 'New' && (
                    <button
                        onClick={(e) => onStatusUpdate(task._id, 'In Progress', e)}
                        className="w-full py-1.5 rounded bg-blue-50 text-blue-600 text-xs font-bold hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"
                    >
                        <Play size={12} fill="currentColor" /> Start Job
                    </button>
                )}

                {task.stage === 'In Progress' && (
                    <button
                        onClick={(e) => onStatusUpdate(task._id, 'Repaired', e)}
                        className="w-full py-1.5 rounded bg-green-50 text-green-600 text-xs font-bold hover:bg-green-100 transition-colors flex items-center justify-center gap-1"
                    >
                        <CheckCircle size={12} /> Mark Complete
                    </button>
                )}

                {task.stage === 'Repaired' && (
                    <div className="flex justify-between items-center text-xs text-gray-400">
                        <span>{task.technician || "Unassigned"}</span>
                        <span className="text-green-600 font-medium flex items-center gap-1">
                            <CheckCircle size={10} /> Done
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MaintenanceWorkflow;