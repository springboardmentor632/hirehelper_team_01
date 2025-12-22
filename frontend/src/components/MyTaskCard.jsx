import React from 'react';

const MyTaskCard = ({ task }) => {
    // Styling status badges to match the UI
    const statusStyles = {
        Pending: 'bg-orange-100 text-orange-600',
        Completed: 'bg-green-100 text-green-600',
    };

    return (
        <div className="w-full bg-bg-highlight rounded-xl border-2 border-action-accept/30 p-6 shadow-sm">
            <div className="flex flex-col gap-4">
                {/* Title and Status */}
                <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-text-primary">
                        {task.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusStyles[task.status] || 'bg-gray-100'}`}>
                        {task.status}
                    </span>
                </div>

                {/* Description */}
                <p className="text-text-secondary text-sm leading-relaxed">
                    {task.description}
                </p>

                {/* Metadata Row */}
                <div className="flex items-center gap-6 text-sm text-text-secondary">
                    <div className="flex items-center gap-2">
                        <span>🗓️</span> {task.date}
                    </div>
                    <div className="flex items-center gap-2">
                        <span>📍</span> {task.location}
                    </div>
                </div>

                {/* Full Width Image Banner */}
                <div className="w-full h-48 lg:h-64 overflow-hidden rounded-lg mt-2">
                    <img 
                        src={task.image} 
                        alt={task.title} 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default MyTaskCard;