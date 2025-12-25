import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import MyTaskCard from '../components/MyTaskCard';
import { fetchMyTasks } from '../utils/api';

const MyTasks = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [myTasks, setMyTasks] = useState([]);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const data = await fetchMyTasks();
                if (mounted) setMyTasks(data);
            } catch (err) {
                console.error('Failed to load my tasks', err.message || err);
            }
        })();
        return () => { mounted = false };
    }, []);

   return (
        <div className="min-h-screen w-full flex bg-[#C7F5A5]">
      <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />

      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-6 right-6 z-50 p-2 bg-[#3A5B22] text-white rounded-md text-2xl"
      >
        {isSidebarOpen ? '✕' : '☰'}
      </button>
            
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