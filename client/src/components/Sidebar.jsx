import React from 'react';
// 1. IMPORT "Settings" correctly here
import { LayoutDashboard, Wrench, Hammer, Users, Calendar, LogOut, Settings } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
        // Ensure Maintenance points to the correct path
        { name: "Maintenance", icon: Wrench, path: "/maintenance" },
        { name: "Equipment", icon: Hammer, path: "/equipment" },
        { name: "Teams", icon: Users, path: "/teams" },
        { name: "Calendar", icon: Calendar, path: "/calendar" },
    ];

    const handleLogout = () => {
        // Clear user data
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="h-screen w-64 bg-[#0f172a] text-white fixed left-0 top-0 flex flex-col justify-between">
            {/* Logo Area */}
            <div className="p-6">
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-blue-600 p-2 rounded-lg">
                        <Wrench size={24} />
                    </div>
                    <span className="text-xl font-bold tracking-wide">GearGuard</span>
                </div>

                {/* Navigation Menu */}
                <nav className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <button
                                key={item.name}
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                <Icon size={20} />
                                <span className="font-medium">{item.name}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom Section */}
            <div className="p-6 border-t border-gray-800">
                <button
                    // 2. Updated click handler for Settings
                    onClick={() => navigate('/settings')}
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors mb-4 w-full"
                >
                    {/* 3. USING "Settings" HERE (Matches the import at the top) */}
                    <Settings size={20} />
                    <span>Settings</span>
                </button>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 text-red-400 hover:text-red-300 transition-colors w-full"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;