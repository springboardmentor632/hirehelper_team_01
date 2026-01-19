const DeleteAccountButton = () => {
    const handleDelete = async () => {
        if (!window.confirm('This will permanently delete your account. Continue?')) {
            return;
        }

        const token = localStorage.getItem('token');

        const res = await fetch('/api/user/delete-account', {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.ok) {
            localStorage.removeItem('token');
            alert('Account deleted');
            window.location.href = '/login';
        } else {
            alert('Failed to delete account');
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded"
        >
            Delete My Account
        </button>
    );
}

export default DeleteAccountButton;
