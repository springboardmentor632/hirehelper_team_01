import React, { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import { fetchFeed } from '../utils/api';

const Feed = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const data = await fetchFeed();
                if (mounted) setTasks(data);
            } catch (err) {
                console.error('Failed to load feed', err.message || err);
            }
        })();
        return () => { mounted = false };
    }, []);

    return (
        <div className="p-6 lg:p-10">
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
        </div>
    );
};

export default Feed;