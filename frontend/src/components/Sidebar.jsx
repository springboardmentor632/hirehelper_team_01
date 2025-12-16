import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// Assuming the logo file is accessible from this path
import logo from '../assets/logo.png'; 

// Define navigation items with icons and paths
const navItems = [
    { name: 'Feed', icon: '🧾', path: '/feed' },
    { name: 'My Tasks', icon: '📝', path: '/mytasks' },
    { name: 'Requests', icon: '📬', path: '/requests' },
    { name: 'My Requests', icon: '📩', path: '/myrequests' },
    { name: 'Add Task', icon: '➕', path: '/addtask' },
    { name: 'Settings', icon: '⚙️', path: '/settings' },
];

const Sidebar = () => {
    const location = useLocation(); // Hook to get current URL path

    return (
        // Sidebar Container: Fixed width, full height, light background
        <div className="hidden lg:flex flex-col w-64 min-h-screen bg-bg-highlight border-r border-border-default shadow-lg">

            {/* Logo and Branding Area */}
            <div className="p-4 flex items-center border-b border-border-default">
                <div className="w-8 h-8 mr-2">
                    <img src={logo} alt="Hire A Helper Logo" className="w-full h-full object-contain" />
                </div>
                <h2 className="text-xl font-bold text-action-link">Hire a Helper</h2>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => (
                    // Check if current path matches the item's path
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`
                            flex items-center p-3 rounded-lg font-medium transition duration-150 ease-in-out
                            ${location.pathname === item.path 
                                ? 'bg-action-accept text-action-decline shadow-md' // Active state (Bright Green background)
                                : 'text-text-primary hover:bg-bg-app hover:text-brand-primary' // Inactive state
                            }
                        `}
                    >
                        <span className="text-xl mr-3">{item.icon}</span>
                        {item.name}
                    </Link>
                ))}
            </nav>

            {/* User Profile Footer */}
            <div className="p-4 border-t border-border-default flex items-center">
                <div className="w-10 h-10 rounded-full bg-text-secondary flex items-center justify-center mr-3 text-white text-lg font-bold">
                    US
                </div>
                <div>
                    <p className="text-sm font-semibold text-text-primary">User</p>
                    <Link to="/profile" className="text-xs text-action-link hover:underline">
                        View profile
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;