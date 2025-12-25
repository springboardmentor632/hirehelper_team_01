import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import MyTaskCard from '../components/MyTaskCard';

const MyTasks = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [myTasks] = useState([
        {
            id: '1',
            title: 'Computer Setup Help',
            status: 'Pending',
            description: 'Looking for someone to help with new computer setup.',
            date: 'Dec 15th, 2025',
            location: 'Downtown Seattle, WA',
            image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=60'
        },
        {
            id: '2',
            title: 'Garden Cleanup',
            status: 'Completed',
            description: 'Weeding, trimming hedges, and general yard maintenance.',
            date: 'Nov 28th, 2025',
            location: 'Bellevue, WA',
            image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=60'
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
                    <h1 className="text-2xl font-bold text-text-primary mb-1">MyTask</h1>
                    <p className="text-text-secondary">Manage your posted tasks.</p>
                </header>

                

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                   {myTasks.map(task => (
                        <MyTaskCard key={task.id} task={task} />
                    ))}
                </div>
            </main>
        </div>
    );
};


export default MyTasks;