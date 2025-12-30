import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Users, Phone, Mail, Clock, Plus, X, Trash2 } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../config'; // Using your imported config

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [showForm, setShowForm] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "", lead: "", email: "", phone: "", members: 0, shift: "Morning (8AM - 4PM)"
    });

    // 1. Fetch Teams on Load
    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        try {
            // FIX 1: Removed the accidental post/delete lines that were causing the crash
            const res = await axios.get(`${API_URL}/teams`);
            setTeams(res.data);
        } catch (err) {
            console.error("Error fetching teams:", err);
        }
    };

    // 2. Handle Create Team
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // FIX 2: Using API_URL instead of hardcoded link
            await axios.post(`${API_URL}/teams`, formData);
            setShowForm(false);
            setFormData({ name: "", lead: "", email: "", phone: "", members: 0, shift: "Morning (8AM - 4PM)" }); // Reset
            fetchTeams(); // Refresh list
        } catch (err) {
            console.error("Error creating team", err);
        }
    };

    // 3. Handle Delete
    const handleDelete = async (id) => {
        if (window.confirm("Delete this team?")) {
            try {
                // FIX 2: Using API_URL instead of hardcoded link
                await axios.delete(`${API_URL}/teams/${id}`);
                fetchTeams();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 w-full ml-0 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 transition-all">
                {/* Header */}
                <div className="mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <Users className="text-blue-600" /> Maintenance Crews
                        </h1>
                        <p className="text-gray-500 mt-1">Manage workforce and shift assignments</p>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className={`px-5 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-all shadow-sm ${showForm ? 'bg-red-50 text-red-600' : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                    >
                        {showForm ? <><X size={20} /> Cancel</> : <><Plus size={20} /> Add New Team</>}
                    </button>
                </div>

                {/* --- ADD TEAM FORM (Collapsible) --- */}
                {showForm && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 mb-8 animate-fade-in-down">
                        <h3 className="font-bold text-gray-800 mb-4">Register New Team</h3>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <input
                                required placeholder="Team Name (e.g. Electricians)"
                                className="border p-2 rounded-lg"
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                            <input
                                required placeholder="Team Lead Name"
                                className="border p-2 rounded-lg"
                                onChange={e => setFormData({ ...formData, lead: e.target.value })}
                            />
                            <input
                                placeholder="Email Contact"
                                className="border p-2 rounded-lg"
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                            <input
                                placeholder="Phone Number"
                                className="border p-2 rounded-lg"
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            />
                            <select
                                className="border p-2 rounded-lg"
                                onChange={e => setFormData({ ...formData, shift: e.target.value })}
                            >
                                <option>Morning (8AM - 4PM)</option>
                                <option>Evening (4PM - 12AM)</option>
                                <option>Night (12AM - 8AM)</option>
                            </select>
                            <input
                                type="number" placeholder="Member Count"
                                className="border p-2 rounded-lg"
                                onChange={e => setFormData({ ...formData, members: e.target.value })}
                            />
                            <button type="submit" className="bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700">
                                Save Team
                            </button>
                        </form>
                    </div>
                )}

                {/* Teams Grid */}
                {teams.length === 0 ? (
                    <div className="text-center py-20 text-gray-400 bg-white rounded-xl border border-dashed">
                        <Users size={48} className="mx-auto mb-4 opacity-20" />
                        <p>No teams found. Click "Add New Team" to start.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teams.map(team => (
                            <div key={team._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow group relative">

                                {/* Delete Icon (Visible on Hover) */}
                                <button
                                    onClick={() => handleDelete(team._id)}
                                    className="absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 size={18} />
                                </button>

                                {/* Card Header */}
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800">{team.name}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                            <span className="text-xs text-gray-500 font-medium uppercase">{team.status}</span>
                                        </div>
                                    </div>
                                    <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold border border-blue-100">
                                        {team.members}
                                    </div>
                                </div>

                                {/* Contact Details */}
                                <div className="space-y-3 text-sm text-gray-600 mt-4 pt-4 border-t border-gray-100">
                                    <p className="flex items-center gap-3">
                                        <Users size={16} className="text-gray-400" />
                                        <span>Lead: <span className="font-medium text-gray-900">{team.lead}</span></span>
                                    </p>
                                    <p className="flex items-center gap-3">
                                        <Mail size={16} className="text-gray-400" />
                                        {team.email || "No Email"}
                                    </p>
                                    <p className="flex items-center gap-3">
                                        <Phone size={16} className="text-gray-400" />
                                        {team.phone || "No Phone"}
                                    </p>
                                    <p className="flex items-center gap-3">
                                        <Clock size={16} className="text-gray-400" />
                                        {team.shift}
                                    </p>
                                </div>

                                <button className="w-full mt-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium text-sm">
                                    View Schedule
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Teams;