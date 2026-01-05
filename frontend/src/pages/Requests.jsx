import React, { useEffect, useState } from "react";
import RequestCard from "../components/RequestCard";
import { getReceivedRequests, updateRequestStatus } from "../utils/api";

const MOCK_REQUESTS = [
  {
    id: 1,
    name: "Marcus Thorne",
    imageUrl: "https://i.pravatar.cc/150?u=marcus",
    rating: 4.9,
    reviews: 128,
    time: "2 hours ago",
    distance: "1.2 miles away",
    message: "Hi! I saw your request for lawn maintenance. I specialize in organic pest control and precision hedging. I have my own tools and can start this weekend.",
    job: "Full Garden Maintenance",
    duration: "4 hours",
    slot: "Sat, Oct 12 • 10:00 AM",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    imageUrl: null,
    rating: 4.7,
    reviews: 42,
    time: "15 mins ago",
    distance: "0.5 miles away",
    message: "I love golden retrievers! I live just around the corner and have been dog-walking for 3 years. I'm very comfortable with high-energy dogs.",
    job: "Dog Walking & Feeding",
    duration: "1 hour",
    slot: "Today • 5:30 PM",
  },
  {
    id: 3,
    name: "Alex Rivera",
    imageUrl: "https://i.pravatar.cc/150?u=alex",
    rating: 5.0,
    reviews: 15,
    time: "Yesterday",
    distance: "3.8 miles away",
    message: "I can help with the shelving unit assembly. I'm an expert with IKEA and custom wall mounts. Please let me know if I should bring heavy-duty wall anchors.",
    job: "Furniture Assembly",
    duration: "2.5 hours",
    slot: "Mon, Oct 14 • 2:00 PM",
  },
];

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const data = await getReceivedRequests();
        if (!mounted) return;
        setRequests(data || []);
      } catch (e) {
        console.error('getReceivedRequests error:', e);
        setError(e.message || 'Failed to load requests');
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => (mounted = false);
  }, []);

  const pushNotification = (notif) => {
    try {
      const existing = JSON.parse(localStorage.getItem('notifications') || '[]');
      existing.unshift(notif);
      localStorage.setItem('notifications', JSON.stringify(existing));
    } catch (e) {
      console.warn('Failed to push notification', e.message);
    }
  };

  const handleStatusChange = async (requestId, status, requestData) => {
    try {
      await updateRequestStatus(requestId, status);
      // update local UI
      setRequests((prev) => prev.map((r) => (r._id === requestId || r.id === requestId ? { ...r, status } : r)));

      // notify requester (store in localStorage so NotificationBell can pick it up)
      const accepted = status === 1;
      const taskTitle = requestData?.task_id?.title || 'your task';
      const notif = {
        id: Date.now(),
        text: accepted ? `Your request for "${taskTitle}" was accepted.` : `Your request for "${taskTitle}" was rejected.`,
        time: new Date().toISOString(),
        unread: true,
      };
      pushNotification(notif);

      alert(accepted ? 'Request accepted' : 'Request rejected');
    } catch (e) {
      alert(e.message || 'Failed to update request');
    }
  };

  const filteredRequests = requests.filter((req) =>
    `${req.requester_id?.first_name || req.requester_id?.name || ''} ${req.task_id?.title || ''}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8">
      {/* Request Cards List */}
      <div className="space-y-6 max-w-5xl">
        {loading && <p className="text-sm text-[#64748B]">Loading requests...</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {!loading && !filteredRequests.length && (
          <div className="bg-[#D8FFBB] border border-dashed border-[#3A5B22] rounded-xl p-12 text-center">
            <p className="text-[#3A5B22] font-medium">No matching requests found.</p>
          </div>
        )}

        {!loading && filteredRequests.map((req) => {
          const requester = req.requester_id || {};
          const name = requester.first_name ? `${requester.first_name} ${requester.last_name || ''}`.trim() : requester.name || 'Requester';
          const message = "I want to work on the task you have provided and its description.";
          return (
            <RequestCard
              key={req._id || req.id}
              name={name}
              imageUrl={requester.profile_picture || ''}
              rating={requester.rating || 0}
              reviews={requester.reviews || 0}
              time={new Date(req.createdAt).toLocaleString()}
              distance={req.distance || ''}
              message={message}
              job={req.task_id?.title || ''}
              duration={req.task_id?.duration || ''}
              slot={req.task_id?.start_time ? new Date(req.task_id.start_time).toLocaleString() : ''}
              search={search}
              onAccept={() => handleStatusChange(req._id || req.id, 1, req)}
              onDecline={() => handleStatusChange(req._id || req.id, 2, req)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Requests;