import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// If logo causes issues, replace with placeholder:
// const logo = "https://via.placeholder.com/32";
import logo from '../assets/logo.png'; 

const navItems = [
    { name: 'Feed', icon: '🧾', path: '/feed' },
    { name: 'My Tasks', icon: '📝', path: '/mytasks' },
    { name: 'Requests', icon: '📬', path: '/requests' },
    { name: 'My Requests', icon: '📩', path: '/myrequests' },
    { name: 'Add Task', icon: '➕', path: '/addtask' },
    { name: 'Settings', icon: '⚙️', path: '/settings' },
];

const Sidebar = ({ isOpen, closeSidebar }) => {
    const location = useLocation();

    return (
        <>
            {/* Mobile Backdrop */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
                    onClick={closeSidebar}
                ></div>
            )}

            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 z-40 w-64 bg-bg-highlight border-r border-border-default shadow-lg transform transition-transform duration-300 ease-in-out
                lg:relative lg:translate-x-0 
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                flex flex-col justify-between
            `}>
                {/* Logo / Header */}
                <div className="p-4 flex items-center border-b border-border-default">
                    <div className="w-8 h-8 mr-2">
                        <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <h2 className="text-xl font-bold text-action-link">Hire a Helper</h2>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={closeSidebar} 
                            className={`
                                flex items-center p-3 rounded-lg font-medium transition duration-150 ease-in-out
                                ${location.pathname === item.path 
                                    ? 'bg-action-accept text-action-decline shadow-md' 
                                    : 'text-text-primary hover:bg-bg-app hover:text-brand-primary' 
                                }
                            `}
                        >
                            <span className="text-xl mr-3">{item.icon}</span>
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Compact User Profile - always at bottom */}
                <div className="p-3 border-t border-border-default flex items-center">
                    <div className="w-8 h-8 rounded-full bg-text-secondary flex items-center justify-center mr-2 text-sm font-bold">
                        US
                    </div>
                    <div className="text-xs">
                        <p className="font-semibold text-text-primary">User</p>
                        <Link to="/profile" className="text-action-link hover:underline">
                            View profile
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
