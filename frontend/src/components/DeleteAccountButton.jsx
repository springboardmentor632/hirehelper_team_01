import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DeleteAccountButton = () => {
    const [deleting, setDeleting] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (!window.confirm('This will permanently delete your account and all data. This cannot be undone. Continue?')) {
            return;
        }

        const token = localStorage.getItem('token');

        if (!token) {
            alert('Not logged in');
            return;
        }

        try {
            setDeleting(true);

            const res = await fetch('/api/user/delete-account', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            const json = await res.json().catch(() => ({ message: 'Invalid response' }));

            console.log('Delete response status:', res.status);
            console.log('Delete response:', json);

            if (res.ok && json.success) {
                // Clear local storage
                localStorage.removeItem('token');
                localStorage.clear();
                
                alert('Account deleted successfully. Redirecting to login...');
                
                // Redirect to login page
                setTimeout(() => {
                    navigate('/login', { replace: true });
                }, 500);
            } else {
                const errorMsg = json?.message || 'Failed to delete account';
                console.error('Delete failed:', errorMsg);
                alert('Error: ' + errorMsg);
            }
        } catch (error) {
            console.error('Delete account error:', error);
            alert('Error: ' + (error.message || 'Failed to delete account'));
        } finally {
            setDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={deleting}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors font-medium"
        >
            {deleting ? 'Deleting Account...' : 'Delete My Account'}
        </button>
    );
}

export default DeleteAccountButton;
