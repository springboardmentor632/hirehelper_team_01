import React, { useEffect, useState } from "react";
import MyRequestCard from "../components/MyRequestCard";
import { getMyRequests } from "../utils/api";

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

  const renderRequests = () => {
    if (!requests.length) return <p className="text-sm text-[#64748B]">No requests found.</p>;

    return requests.map((r) => {
      const task = r.task_id || {};
      const owner = r.task_owner_id || {};
      const recipientName = owner.first_name ? `${owner.first_name} ${owner.last_name || ''}`.trim() : owner.name || owner.email_id || 'User';
      const recipientImage = owner.profile_picture || '';
      const taskTitle = task.title || 'Task';
      const location = task.location || '';
      const dateTime = task?.start_time ? new Date(task.start_time).toLocaleString() : '';
      const status = r.status === 1 ? 'Accepted' : r.status === 2 ? 'Rejected' : 'Pending';

      return (
        <MyRequestCard
          key={r._id || r.id}
          taskTitle={taskTitle}
          recipientName={recipientName}
          recipientImage={recipientImage}
          message={"I want to work on the task you have provided and its description."}
          location={location}
          dateTime={dateTime}
          status={status}
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