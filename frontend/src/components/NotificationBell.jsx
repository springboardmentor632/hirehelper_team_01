import React, { useState, useRef, useEffect } from 'react';

const NotificationBell = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const [notifications, setNotifications] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('notifications') || '[]');
        } catch (e) {
            return [];
        }
    });

    useEffect(() => {
        const onStorage = (e) => {
            if (e.key === 'notifications') {
                try { setNotifications(JSON.parse(e.newValue || '[]')); } catch { /* ignore */ }
            }
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Reduced size button: p-1.5 and text-lg */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-1.5 text-lg bg-white border border-border-default rounded-full hover:bg-bg-app transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-action-accept"
            >
                🔔
                {/* Smaller Badge: h-2 w-2 */}
                <span className="absolute top-0.5 right-0.5 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
            </button>

            {/* Dropdown remains the same for readability */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-bg-highlight border border-border-default rounded-xl shadow-xl z-50 overflow-hidden">
                    <div className="p-3 border-b border-border-default bg-white font-bold text-sm text-text-primary">
                        Notifications
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                        {notifications.length === 0 && (
                            <div className="p-3 text-sm text-[#64748B]">No notifications</div>
                        )}
                        {notifications.map((notif) => (
                            <div key={notif.id} className="p-3 border-b border-border-default last:border-0 hover:bg-bg-app cursor-pointer">
                                <p className="text-xs text-text-primary font-medium">{notif.text}</p>
                                <p className="text-[10px] text-text-secondary mt-1">{new Date(notif.time).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;