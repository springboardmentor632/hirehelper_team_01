import React from 'react';

const TaskCard = ({ task }) => {
    return (
        <div className="bg-bg-highlight rounded-xl border border-border-default overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
            {/* Task Image */}
            <div className="h-48 w-full overflow-hidden bg-gray-200">
                <img 
                    src={task.picture || 'https://via.placeholder.com/400x300?text=No+Image'} 
                    alt={task.title} 
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content Area */}
            <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-text-primary mb-1 truncate">
                    {task.title}
                </h3>
                <p className="text-sm text-text-secondary line-clamp-3 mb-4 flex-1">
                    {task.description}
                </p>

                {/* Metadata */}
                <div className="space-y-1 mb-4">
                    <div className="flex items-center text-xs text-text-secondary">
                        <span className="mr-2">📍</span>
                        {task.location}
                    </div>
                    <div className="flex items-center text-xs text-text-secondary">
                        <span className="mr-2">📅</span>
                        {task.start_time}
                    </div>
                </div>

                {/* Footer: User & Action */}
                <div className="flex items-center justify-between pt-3 border-t border-border-default">
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-white text-xs font-bold mr-2 overflow-hidden">
                            {task.user_photo ? (
                                <img src={task.user_photo} alt={task.user_name} className="w-full h-full object-cover" />
                            ) : (
                                task.user_name?.charAt(0) || 'U'
                            )}
                        </div>
                        <span className="text-xs font-semibold text-text-primary">
                            {task.user_name}
                        </span>
                    </div>
                    <button className="px-4 py-1.5 bg-action-accept text-action-decline text-xs font-bold rounded-md hover:bg-opacity-90 transition-colors">
                        Request
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;