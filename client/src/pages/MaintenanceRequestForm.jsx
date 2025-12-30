import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
// 1. Added Printer icon
import { Save, ArrowLeft, Wrench, User, Trash2, Printer } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const MaintenanceRequestForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Form State
    const [formData, setFormData] = useState({
        subject: "",
        equipment: "",
        type: "Corrective",
        team: "",
        technician: "",
        priority: "Normal",
        scheduledDate: "",
        duration: 0,
        description: "",
        stage: "New"
    });

    const [equipmentList, setEquipmentList] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch Equipment List
    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/equipment");
                setEquipmentList(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching equipment:", err);
                setLoading(false);
            }
        };
        fetchEquipment();
    }, []);

    // Fetch Request Data if Editing
    useEffect(() => {
        if (id) {
            const fetchRequest = async () => {
                try {
                    const res = await axios.get(`http://localhost:5000/api/maintenance/${id}`);
                    setFormData(res.data);
                } catch (err) {
                    console.error("Error fetching request:", err);
                }
            };
            fetchRequest();
        }
    }, [id]);

    const handleEquipmentChange = (e) => {
        const selectedName = e.target.value;
        const selectedEq = equipmentList.find(eq => eq.name === selectedName);

        setFormData(prev => ({
            ...prev,
            equipment: selectedName,
            team: selectedEq ? selectedEq.department : ""
        }));
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this maintenance request?")) {
            try {
                await axios.delete(`http://localhost:5000/api/maintenance/${id}`);
                alert("Request deleted successfully.");
                navigate('/dashboard');
            } catch (err) {
                console.error("Error deleting request:", err);
                alert("Failed to delete request.");
            }
        }
    };

    // --- NEW: Handle Print ---
    const handlePrint = () => {
        window.print();
    };

    const handleSubmit = async () => {
        if (!formData.subject || formData.subject.trim() === "") {
            alert("Error: Please enter a Subject for this request.");
            return;
        }
        if (!formData.equipment || formData.equipment.trim() === "") {
            alert("Error: Please select an Equipment from the list.");
            return;
        }

        try {
            if (id) {
                await axios.put(`http://localhost:5000/api/maintenance/${id}`, formData);
            } else {
                await axios.post("http://localhost:5000/api/maintenance", formData);
            }
            navigate('/dashboard');
        } catch (err) {
            console.error("Error saving request:", err);
            const errorMsg = err.response?.data?.message || "Failed to save request. Check console.";
            alert(errorMsg);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 ml-64">

                {/* Header */}
                <div className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10 no-print">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/dashboard')} className="text-gray-500 hover:text-gray-700">
                            <ArrowLeft size={20} />
                        </button>
                        <h1 className="text-xl font-bold text-gray-800">
                            {id ? "Edit Request" : "New Maintenance Request"}
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* --- NEW: PRINT BUTTON --- */}
                        {id && (
                            <button
                                onClick={handlePrint}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
                            >
                                <Printer size={18} />
                                <span>Print Job Card</span>
                            </button>
                        )}

                        {id && (
                            <button
                                onClick={handleDelete}
                                className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg flex items-center gap-2 font-medium border border-red-200 transition-colors"
                            >
                                <Trash2 size={18} />
                                <span>Delete</span>
                            </button>
                        )}

                        <button
                            onClick={handleSubmit}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 shadow-sm font-medium"
                        >
                            <Save size={18} />
                            <span>Save Request</span>
                        </button>
                    </div>
                </div>

                {/* Form Content */}
                <div className="p-8 max-w-4xl mx-auto">
                    {/* --- ADDED 'print-signature' CLASS HERE --- */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 print-signature">

                        {/* Subject Field */}
                        <div className="mb-8">
                            <label className="block text-sm font-medium text-gray-500 mb-1">Subject <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                placeholder="e.g. Leaking Oil or Screen Flicker"
                                className="w-full text-2xl font-semibold text-gray-900 border-b-2 border-gray-200 focus:border-blue-500 outline-none py-2 px-1 bg-transparent"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            />
                        </div>

                        {/* Main Fields Grid */}
                        <div className="grid grid-cols-2 gap-x-12 gap-y-6">

                            {/* Left Column: Equipment Details */}
                            <div className="space-y-6">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">Equipment</h3>

                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Equipment Name <span className="text-red-500">*</span></label>
                                    <select
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                        value={formData.equipment}
                                        onChange={handleEquipmentChange}
                                    >
                                        <option value="">Select Equipment...</option>
                                        {equipmentList.map(eq => (
                                            <option key={eq._id} value={eq.name}>{eq.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Maintenance Team</label>
                                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-md border border-gray-200 text-gray-500">
                                        <Wrench size={16} />
                                        <span>{formData.team || "Auto-filled from Equipment"}</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Technician</label>
                                    <div className="flex items-center gap-2">
                                        <User size={16} className="text-gray-400" />
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            placeholder="Assigned to..."
                                            value={formData.technician}
                                            onChange={(e) => setFormData({ ...formData, technician: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Execution Details */}
                            <div className="space-y-6">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">Execution</h3>

                                {/* Maintenance Type Toggle */}
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">Maintenance Type</label>
                                    <div className="flex bg-gray-100 p-1 rounded-lg w-fit">
                                        <button
                                            onClick={() => setFormData({ ...formData, type: 'Corrective' })}
                                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${formData.type === 'Corrective' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                        >
                                            Corrective
                                        </button>
                                        <button
                                            onClick={() => setFormData({ ...formData, type: 'Preventive' })}
                                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${formData.type === 'Preventive' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                        >
                                            Preventive
                                        </button>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label className="block text-sm text-gray-600 mb-1">Scheduled Date</label>
                                        <input
                                            type="date"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            value={formData.scheduledDate ? formData.scheduledDate.substring(0, 10) : ""}
                                            onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                                        />
                                    </div>
                                    <div className="w-1/3">
                                        <label className="block text-sm text-gray-600 mb-1">Priority</label>
                                        <select
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            value={formData.priority}
                                            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                        >
                                            <option>Low</option>
                                            <option>Normal</option>
                                            <option>High</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="w-1/3">
                                    <label className="block text-sm text-gray-600 mb-1">Duration (Hrs)</label>
                                    <input
                                        type="number"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Description / Notes */}
                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description / Notes</label>
                            <textarea
                                rows={4}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Describe the issue or maintenance steps..."
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default MaintenanceRequestForm;