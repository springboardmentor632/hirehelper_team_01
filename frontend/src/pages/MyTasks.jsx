import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Added for redirection
import MyTaskCard from '../components/MyTaskCard';
import { fetchMyTasks } from '../utils/api';

const MyTasks = () => {
    const [myTasks, setMyTasks] = useState([]);
    const [loading, setLoading] = useState(true); // Added to handle loading state
    const navigate = useNavigate(); // Initialize navigation hook

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const data = await fetchMyTasks();
                if (mounted) {
                    setMyTasks(data);
                    setLoading(false);
                }
            } catch (err) {
                console.error('Failed to load my tasks', err.message || err);
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false };
    }, []);

    // 1. Show nothing or a loader while fetching data
    if (loading) {
        return <div className="p-10 text-center text-text-secondary">Loading tasks...</div>;
    }

    return (
        <div className="p-6 lg:p-10 min-h-screen bg-bg-app">
            <h1 className="text-2xl font-bold text-text-primary mb-6">My Tasks</h1>

            {myTasks.length > 0 ? (
                // 2. Render the grid if tasks exist
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {myTasks.map(task => (
                        <MyTaskCard key={task.id || task._id} task={task} />
                    ))}
                </div>
            ) : (
                // 3. Render Empty State if no tasks are found
                <div className="flex flex-col items-center justify-center py-20 bg-bg-highlight rounded-xl border-2 border-dashed border-action-accept">
                    <div className="text-5xl mb-4">📝</div>
                    <h2 className="text-xl font-semibold text-text-primary mb-2">No tasks found</h2>
                    <p className="text-text-secondary mb-6 text-center max-w-xs">
                        You haven't posted any tasks yet. Start by creating your first task!
                    </p>
                    <button
                        onClick={() => navigate('/addtask')}
                        className="px-6 py-3 bg-action-accept text-action-decline font-bold rounded-md shadow-md hover:opacity-90 transition-all"
                    >
                        + Create New Task
                    </button>
                </div>
            )}
        </div>
    );
};

export default MyTasks;