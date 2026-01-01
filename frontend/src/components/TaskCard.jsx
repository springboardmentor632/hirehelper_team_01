import React from 'react';

const TaskCard = ({ task }) => {
    const owner = task.user_id || {};
    const userName = owner.first_name ? `${owner.first_name} ${owner.last_name || ''}`.trim() : task.user_name || 'User';
    const userPhoto = owner.profile_picture || task.user_photo || '';
    const startTime = task.start_time ? new Date(task.start_time).toLocaleString() : '';

    return (
        /* Applied border-[2px] and border-action-accept here */
        <div className="bg-bg-highlight rounded-xl border-[2px] border-action-accept overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
            
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
                        {startTime}
                    </div>
                </div>

                {/* Footer: User & Action */}
                {/* Updated footer border to match the theme color subtly */}
                <div className="flex items-center justify-between pt-3 border-t border-action-accept/20">
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-white text-xs font-bold mr-2 overflow-hidden">
                            {userPhoto ? (
                                <img src={userPhoto} alt={userName} className="w-full h-full object-cover" />
                            ) : (
                                (userName || 'U').charAt(0)
                            )}
                        </div>
                        <span className="text-xs font-semibold text-text-primary">
                            {userName}
                        </span>
                    </div>
                    <button className="px-4 py-1.5 bg-action-accept text-action-decline text-xs font-bold rounded-md hover:brightness-95 transition-all">
                        Request
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;