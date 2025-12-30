import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Plus, Search, Trash2, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EquipmentList = () => {
    const navigate = useNavigate();
    const [equipment, setEquipment] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch Data from Backend
    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const res = await axios.get("https://gearguard-wsig.onrender.com/api/equipment");
                setEquipment(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
                setLoading(false);
            }
        };
        fetchEquipment();
    }, []);

    // Delete Function
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this equipment?")) {
            try {
                await axios.delete(`https://gearguard-wsig.onrender.com/api/equipment/${id}`);
                setEquipment(equipment.filter((item) => item._id !== id));
            } catch (err) {
                console.error("Error deleting item:", err);
                alert("Failed to delete item.");
            }
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 ml-64">

                {/* Header */}
                <div className="bg-white border-b border-gray-200 px-8 py-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Equipment Inventory</h1>
                            <p className="text-gray-500 mt-1">Manage all machinery and assets</p>
                        </div>
                        <button
                            onClick={() => navigate('/equipment/new')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-colors"
                        >
                            <Plus size={18} />
                            <span>Add Equipment</span>
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="flex gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search by name, serial #, or category..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* List Content */}
                <div className="p-8">
                    {loading ? (
                        <div className="text-center py-10 text-gray-500">Loading equipment...</div>
                    ) : equipment.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                            <Database className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 text-lg">No equipment found.</p>
                            <p className="text-gray-400 text-sm">Click "Add Equipment" to start.</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold text-gray-700 text-sm">Name</th>
                                        <th className="px-6 py-4 font-semibold text-gray-700 text-sm">Serial No.</th>
                                        <th className="px-6 py-4 font-semibold text-gray-700 text-sm">Category</th>
                                        <th className="px-6 py-4 font-semibold text-gray-700 text-sm">Location</th>
                                        <th className="px-6 py-4 font-semibold text-gray-700 text-sm">Status</th>
                                        <th className="px-6 py-4 font-semibold text-gray-700 text-sm text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {equipment.map((item) => (
                                        <tr key={item._id} className="hover:bg-gray-50 transition-colors">

                                            {/* --- CLICKABLE NAME CELL --- */}
                                            <td
                                                className="px-6 py-4 font-medium text-blue-600 cursor-pointer hover:underline"
                                                onClick={() => navigate(`/equipment/${item._id}`)} // Navigate to Edit Page
                                                title="Click to Edit"
                                            >
                                                {item.name}
                                            </td>

                                            <td className="px-6 py-4 text-gray-600 font-mono text-xs">{item.serialNumber}</td>
                                            <td className="px-6 py-4">
                                                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium border border-blue-100">
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{item.location}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${item.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' :
                                                    item.status === 'Under Maintenance' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                                        'bg-red-50 text-red-700 border-red-200'
                                                    }`}>
                                                    <span className={`h-1.5 w-1.5 rounded-full ${item.status === 'Active' ? 'bg-green-500' :
                                                        item.status === 'Under Maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                                                        }`}></span>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="text-gray-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-all"
                                                    title="Delete Equipment"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EquipmentList;