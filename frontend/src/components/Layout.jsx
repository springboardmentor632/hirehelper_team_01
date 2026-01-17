import React, { useState, useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Loader from '../pages/Loader'; 
import NotificationBell from './NotificationBell';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(false);
    const location = useLocation();

    const getPageDetails = () => {
        switch(location.pathname) {
            case '/feed': return { title: 'Feed', desc: 'Find tasks you can help with.' };
            case '/mytasks': return { title: 'My Tasks', desc: 'Manage your active tasks.' };
            case '/addtask': return { title: 'Add Task', desc: 'Post a new task for helpers.' };
            case '/requests': return { title: 'Requests', desc: 'Accept or decline requests to help with your tasks' };
            case '/myrequests': return { title: 'My Requests', desc: 'Track your sent requests.' };
            case '/settings': return { title: 'Settings', desc: 'Manage your account preferences.' };
            default: return { title: 'HireHelper', desc: '' };
        }
    };

    const { title, desc } = getPageDetails();

    useEffect(() => {
        setIsPageLoading(true);
        const timer = setTimeout(() => setIsPageLoading(false), 800); 
        return () => clearTimeout(timer);
    }, [location.pathname]); 

    return (
        <div className="h-screen w-full flex bg-[#C7F5A5] overflow-hidden font-sans">
            <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />

            <main className="flex-1 h-full flex flex-col overflow-hidden relative">
                
                {/* --- UPLIFTED DASHBOARD HEADER --- */}
                <header className="w-full p-6 lg:p-5 flex flex-col gap-2 bg-transparent z-40 border-b  border-action-accept">
                    <div className="flex items-center justify-between">
                        {/* 1. Left: Mobile Toggle & Page Title */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="lg:hidden p-2 bg-[#3A5B22] text-white rounded-md text-xl"
                            >
                                ☰
                            </button>
                            <h1 className="text-3xl font-bold text-[#1A1A1A]">
                                {title}
                            </h1>
                        </div>

                        {/* 2. Right: Conditional Search & Bell */}
                        <div className="flex items-center gap-6">
                            
                            

                            <NotificationBell />
                        </div>
                    </div>

                    {/* Description beneath the title */}
                    {desc && (
                        <p className="text-sm md:text-base text-[#3A5B22]/60 font-medium">
                            {desc}
                        </p>
                    )}
                </header>

                {/* --- PAGE CONTENT AREA --- */}
                <div className="flex-1 overflow-y-auto px-6 pb-6 lg:px-8">
                    {isPageLoading && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#C7F5A5]/80 backdrop-blur-sm">
                            <Loader />
                        </div>
                    )}
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;