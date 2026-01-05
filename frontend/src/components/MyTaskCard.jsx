import React from 'react';

const MyTaskCard = ({ task }) => {
    // Styling status badges
    const statusStyles = {
        Pending: 'bg-orange-100 text-orange-600',
        Active: 'bg-blue-100 text-blue-600',
        Completed: 'bg-green-100 text-green-600',
    };

    const dateStr = task.start_time ? new Date(task.start_time).toLocaleString() : task.date || '';
    const statusText = typeof task.status === 'number' ? (task.status === 1 ? 'Active' : 'Pending') : task.status;

    return (
        /* flex-col h-full ensures all cards in a row stretch to the same height */
        <div className="w-full h-full bg-bg-highlight rounded-xl border-2 border-action-accept/30 shadow-sm flex flex-col overflow-hidden">
            
            {/* 1. Image Section: Fixed Aspect Ratio (16:9) */}
            <div className="w-full aspect-video overflow-hidden bg-gray-200 flex-shrink-0">
                <img 
                    src={task.picture || task.image || 'https://via.placeholder.com/400x225?text=No+Image'} 
                    alt={task.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                />
            </div>

            {/* 2. Content Section: Using flex-1 to push footer down if needed */}
            <div className="p-5 flex flex-col flex-1 gap-3">
                
                {/* Header: Title and Status */}
                <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-bold text-[#1A1A1A] line-clamp-1">
                        {task.title}
                    </h3>
                    <span className={`flex-shrink-0 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusStyles[statusText] || 'bg-gray-100'}`}>
                        {statusText}
                    </span>
                </div>

                {/* Description: Clamped to exactly 3 lines to maintain card height */}
                <p className="text-text-secondary text-sm leading-relaxed line-clamp-3 min-h-[3rem]">
                    {task.description}
                </p>

                {/* Metadata: Pushed to the bottom of the content area */}
                <div className="mt-auto pt-4 border-t border-action-accept/10 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-[#3A5B22]/70 font-medium">
                        <span className="grayscale">🗓️</span> 
                        <span className="truncate">{dateStr}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#3A5B22]/70 font-medium">
                        <span className="grayscale">📍</span> 
                        <span className="truncate">{task.location}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyTaskCard;