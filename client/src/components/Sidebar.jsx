import React, { useState } from 'react';
import { LayoutDashboard, Wrench, Hammer, Users, Calendar, LogOut, Settings, Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false); // New state for mobile menu

    const menuItems = [
        { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
        { name: "Maintenance", icon: Wrench, path: "/maintenance" },
        { name: "Equipment", icon: Hammer, path: "/equipment" },
        { name: "Teams", icon: Users, path: "/teams" },
        { name: "Calendar", icon: Calendar, path: "/calendar" },
    ];

    const handleNavigation = (path) => {
        navigate(path);
        setIsOpen(false); // Close menu after clicking on mobile
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <>
            {/* --- MOBILE TOGGLE BUTTON --- */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* --- MOBILE OVERLAY (Dark background when menu is open) --- */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* --- SIDEBAR CONTAINER --- */}
            {/* Added: -translate-x-full (hidden on mobile) and md:translate-x-0 (shown on desktop) */}
            <div className={`
                h-screen w-64 bg-[#0f172a] text-white fixed left-0 top-0 flex flex-col justify-between z-50 transition-transform duration-300 ease-in-out shadow-2xl
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:translate-x-0
            `}>

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
                                    onClick={() => handleNavigation(item.path)}
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
                        onClick={() => handleNavigation('/settings')}
                        className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors mb-4 w-full"
                    >
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
        </>
    );
};

export default Sidebar;