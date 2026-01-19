import React, { useEffect, useState } from "react";
import MyRequestCard from "../components/MyRequestCard";
import { getMyRequests, cancelRequest } from "../utils/api";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const data = await getMyRequests();
        if (!mounted) return;
        setRequests(data || []);
      } catch (e) {
        console.error('getMyRequests error:', e);
        setError(e.message || 'Failed to load requests');
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => (mounted = false);
  }, []);

  const handleCancelRequest = async (requestId) => {
    if (!window.confirm("Are you sure you want to cancel this request?")) return;
    try {
      await cancelRequest(requestId);
      // Remove request from UI immediately
      setRequests(prev => prev.filter(r => r._id !== requestId));
    } catch (e) {
      alert(e.message || "Failed to cancel request");
    }
  };

  const renderRequests = () => {
    if (!requests.length) return <p className="text-sm text-[#64748B]">No requests found.</p>;

    return requests.map((r) => {
      const task = r.task_id || {};
      const taskOwner = task.user_id || {};
      const recipientName = taskOwner.first_name ? `${taskOwner.first_name} ${taskOwner.last_name || ''}`.trim() : 'User';
      const recipientImage = taskOwner.profile_picture || '';
      const taskTitle = task.title || 'Task';
      const location = task.location || '';
      const dateTime = task?.start_time ? new Date(task.start_time).toLocaleString() : '';
      // Ensure this matches the strings exactly
const status = r.status === 1 ? 'Accepted' : r.status === 2 ? 'Rejected' : 'Pending';
      const message = r.message || "I want to work on the task you have provided.";

      return (
        <MyRequestCard
          key={r._id || r.id}
          requestId={r._id}
          taskTitle={taskTitle}
          recipientName={recipientName}
          recipientImage={recipientImage}
          message={message}
          location={location}
          dateTime={dateTime}
          status={status}
          onCancel={() => handleCancelRequest(r._id)}
          canCancel={status === 'Pending'}
        />
      );
    });
  };

  return (
    <div className="p-6 lg:p-10">
      <div className="space-y-6 max-w-5xl">
        {loading && <p className="text-sm text-[#64748B]">Loading your requests...</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {!loading && !error && renderRequests()}
      </div>
    </div>
  );
};

export default MyRequests;