import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TaskCard from '../components/TaskCard';

const Feed = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    // Dummy data mimicking your backend Task schema
    const [tasks] = useState([
        {
            id: '1',
            title: 'Help Moving Furniture',
            description: 'Need help moving a few large items (sofa, bed, dresser). All items are on the ground floor, moving to an apartment...',
            location: 'Downtown Central, USA',
            start_time: 'Sat, Oct 26th - 10:00 AM',
            user_name: 'Robert Wilson',
            picture: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=500&q=60'
        },
        {
            id: '2',
            title: 'Garden Maintenance',
            description: 'Looking for someone to help with weeding and lawn mowing this weekend.',
            location: 'North Hills, USA',
            start_time: 'Sun, Oct 27th - 09:00 AM',
            user_name: 'Jane Smith',
            picture: 'https://images.unsplash.com/photo-1558905619-171501fd693c?auto=format&fit=crop&w=500&q=60'
        },
        {
            id: '3',
            title: 'Help Moving Furniture',
            description: 'Need help moving a few large items (sofa, bed, dresser). All items are on the ground floor, moving to an apartment...',
            location: 'Downtown Central, USA',
            start_time: 'Sat, Oct 26th - 10:00 AM',
            user_name: 'Robert Wilson',
            picture: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=500&q=60'
        }
    ]);

    return (
        <div className="flex bg-bg-app min-h-screen relative">
            {/* 1. Hamburger Icon - Positioned Top Right on small screens */}
            <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden fixed top-6 right-6 z-50 p-2 bg-action-accept text-white rounded-md shadow-lg text-2xl"
            >
                {isSidebarOpen ? '✕' : '☰'}
            </button>

            {/* 2. Sidebar - Now accepts props for mobile visibility */}
            <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />

            <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-text-primary mb-1">Feed</h1>
                    <p className="text-text-secondary">Find tasks you can help with.</p>
                </header>

                {/* Filter / Search Bar */}
                <div className="flex flex-wrap gap-4 mb-8">
                    <div className="relative flex-1 min-w-[200px]">
                        <input 
                            type="text" 
                            placeholder="Search tasks..." 
                            className="w-full p-2.5 pl-10 border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-action-accept bg-white"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2">🔍</span>
                    </div>
                    
                    <select className="p-2.5 border border-border-default rounded-lg bg-white min-w-[120px]">
                        <option>Category</option>
                    </select>

                    <select className="p-2.5 border border-border-default rounded-lg bg-white min-w-[120px]">
                        <option>Location</option>
                    </select>

                    <input 
                        type="date" 
                        className="p-2.5 border border-border-default rounded-lg bg-white"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {tasks.map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Feed;