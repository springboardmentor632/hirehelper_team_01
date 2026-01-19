import React, { useState } from 'react';

const RequestModal = ({ isOpen, onClose, onSubmit, taskTitle }) => {
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submitting) return;
        
        try {
            setSubmitting(true);
            await onSubmit(message);
            setMessage('');
            onClose();
        } catch (err) {
            console.error('Modal submit error:', err);
        } finally {
            setSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#D8FFBB] rounded-xl shadow-lg max-w-md w-full p-6 border-2 border-[#3A5B22]">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-[#1E293B]">
                        Send Request
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-[#64748B] hover:text-[#1E293B] text-2xl leading-none"
                    >
                        ×
                    </button>
                </div>

                {/* Task Info */}
                <div className="mb-4 p-3 bg-white rounded-lg border border-[#3A5B22]/20">
                    <p className="text-sm text-[#64748B]">Task</p>
                    <p className="font-semibold text-[#1E293B]">{taskTitle}</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Message Input */}
                    <div>
                        <label className="block text-sm font-semibold text-[#1E293B] mb-2">
                            Message (Optional)
                        </label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Tell the task owner why you're interested in helping..."
                            maxLength={500}
                            className="w-full p-3 border border-[#3A5B22]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A5B22] resize-none"
                            rows={4}
                        />
                        <p className="text-xs text-[#94A3B8] mt-1">
                            {message.length}/500 characters
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={submitting}
                            className="flex-1 px-4 py-2 bg-[#F1F5F9] text-[#334155] rounded-lg font-semibold hover:bg-[#E2E8F0] transition-colors disabled:opacity-60"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex-1 px-4 py-2 bg-[#3A5B22] text-white rounded-lg font-semibold hover:brightness-95 transition-all disabled:opacity-60"
                        >
                            {submitting ? 'Sending...' : 'Send Request'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RequestModal;
