import React, { useState, useEffect } from 'react';
import MyTaskCard from '../components/MyTaskCard';
import { fetchMyTasks } from '../utils/api';

const MyTasks = () => {
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
        <div className="p-6 lg:p-10">
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-text-primary mb-1">My Task</h1>
                <p className="text-text-secondary">Manage your posted tasks.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {myTasks.map(task => (
                    <MyTaskCard key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
};

export default MyTasks;