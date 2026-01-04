import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the auth token
        navigate('/login');
    };

    return (
        <>
            {/* Mobile Backdrop - Increased z-index to z-50 */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-50 lg:hidden" 
                    onClick={closeSidebar}
                ></div>
            )}

            {/* Sidebar Container - Increased z-index to z-50 */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-bg-highlight border-r border-border-default shadow-lg flex flex-col transform transition-transform duration-300 ease-in-out
                lg:relative lg:translate-x-0 
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>

                {/* Logo Section */}
                <div className="p-4 flex items-center border-b border-border-default">
                    <div className="w-8 h-8 mr-2">
                        <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <h2 className="text-xl font-bold text-action-link">Hire a Helper</h2>
                </div>

                {/* Navigation - Added flex-grow to push footer down */}
                <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
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

                {/* Footer Section: User Profile & Logout */}
                <div className="p-4 border-t border-border-default space-y-4">
                    
                    {/* Logout Button */}
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center p-3 rounded-lg font-medium text-text-primary hover:bg-bg-app hover:text-brand-primary transition duration-150 ease-in-out"
                    >
                        <span className="text-xl mr-3">🚪</span>
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;