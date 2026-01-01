import React from 'react';

const MyTaskCard = ({ task }) => {
    // Styling status badges to match the UI
    const statusStyles = {
        Pending: 'bg-orange-100 text-orange-600',
        Completed: 'bg-green-100 text-green-600',
    };

    const dateStr = task.start_time ? new Date(task.start_time).toLocaleString() : task.date || '';
    const statusText = typeof task.status === 'number' ? (task.status === 1 ? 'Active' : 'Pending') : task.status;
    return (
        <div className="w-full bg-bg-highlight rounded-xl border-2 border-action-accept/30 p-6 shadow-sm">
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-text-primary">{task.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusStyles[statusText] || 'bg-gray-100'}`}>
                        {statusText}
                    </span>
                </div>

                <p className="text-text-secondary text-sm leading-relaxed">{task.description}</p>

                <div className="flex items-center gap-6 text-sm text-text-secondary">
                    <div className="flex items-center gap-2"><span>🗓️</span> {dateStr}</div>
                    <div className="flex items-center gap-2"><span>📍</span> {task.location}</div>
                </div>

                <div className="w-full h-48 lg:h-64 overflow-hidden rounded-lg mt-2">
                    <img src={task.picture || task.image} alt={task.title} className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    );
};

export default MyTaskCard;