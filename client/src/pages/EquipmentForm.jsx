import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Save, ArrowLeft, UploadCloud } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EquipmentForm = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Check if we are editing an existing item

    // Form State matching our MongoDB Model
    const [formData, setFormData] = useState({
        name: "",
        serialNumber: "",
        category: "Machinery",
        location: "Main Hall",
        department: "Heavy Mechanics",
        status: "Active"
    });

    const [error, setError] = useState(false);

    // If editing, fetch the existing data first
    useEffect(() => {
        if (id) {
            const fetchEquipment = async () => {
                try {
                    const res = await axios.get(`https://gearguard-wsig.onrender.com/api/equipment/${id}`);
                    setFormData(res.data);
                } catch (err) {
                    console.error("Error fetching equipment:", err);
                }
            };
            fetchEquipment();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        try {
            if (id) {
                // UPDATE existing equipment
                await axios.put(`https://gearguard-wsig.onrender.com/api/equipment/${id}`, formData);
            } else {
                // CREATE new equipment
                await axios.post("https://gearguard-wsig.onrender.com/api/equipment", formData);
            }
            navigate('/equipment'); // Go back to the list after saving
        } catch (err) {
            console.error(err);
            setError(true);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 ml-64">

                {/* Header */}
                <div className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/equipment')} className="text-gray-500 hover:text-gray-700">
                            <ArrowLeft size={20} />
                        </button>
                        <h1 className="text-xl font-bold text-gray-800">
                            {id ? "Edit Equipment" : "Add New Equipment"}
                        </h1>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 shadow-sm font-medium"
                    >
                        <Save size={18} />
                        <span>Save Machine</span>
                    </button>
                </div>

                {/* Form Content */}
                <div className="p-8 max-w-4xl mx-auto">
                    <form className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">

                        {error && <div className="text-red-500 text-center bg-red-50 p-2 rounded">Error saving data! Check console.</div>}

                        <div className="grid grid-cols-2 gap-6">
                            {/* Name */}
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Equipment Name</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="e.g. CNC Machine 01"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>

                            {/* Serial Number */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="e.g. SN-2024-001"
                                    value={formData.serialNumber}
                                    onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                                    required
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    className="w-full border border-gray-300 rounded-lg p-2.5 outline-none bg-white"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option>Machinery</option>
                                    <option>Electronics</option>
                                    <option>Vehicles</option>
                                    <option>Tools</option>
                                </select>
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg p-2.5 outline-none"
                                    placeholder="e.g. Workshop A"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                />
                            </div>

                            {/* Department */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg p-2.5 outline-none"
                                    placeholder="e.g. Maintenance"
                                    value={formData.department}
                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                />
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    className="w-full border border-gray-300 rounded-lg p-2.5 outline-none bg-white"
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                >
                                    <option value="Active">Active</option>
                                    <option value="Under Maintenance">Under Maintenance</option>
                                    <option value="Scrap">Scrap</option>
                                </select>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EquipmentForm;