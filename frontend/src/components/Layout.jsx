import React, { useState, useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Loader from '../pages/Loader'; 

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(false);
    const location = useLocation();

    
    useEffect(() => {
        setIsPageLoading(true);

        
        const timer = setTimeout(() => {
            setIsPageLoading(false);
        }, 1000); 

        return () => clearTimeout(timer);
    }, [location.pathname]); 

    return (
        <div className="h-screen w-full flex bg-[#C7F5A5] overflow-hidden">
            <Sidebar 
                isOpen={isSidebarOpen} 
                closeSidebar={() => setIsSidebarOpen(false)} 
            />

            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden fixed top-6 right-6 z-50 p-2 bg-[#3A5B22] text-white rounded-md text-2xl shadow-lg"
            >
                {isSidebarOpen ? "✕" : "☰"}
            </button>

            <main className="flex-1 h-full overflow-y-auto relative">
                
                {isPageLoading && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#C7F5A5]/80 backdrop-blur-sm">
                        <Loader />
                    </div>
                )}
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;