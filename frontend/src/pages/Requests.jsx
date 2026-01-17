import React, { useEffect, useState } from "react";
import RequestCard from "../components/RequestCard";
import { getReceivedRequests, updateRequestStatus } from "../utils/api";

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
        console.error("getReceivedRequests error:", e);
        setError(e.message || "Failed to load requests");
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => (mounted = false);
  }, []);

  const pushNotification = (notif) => {
    try {
      const existing = JSON.parse(localStorage.getItem("notifications") || "[]");
      existing.unshift(notif);
      localStorage.setItem("notifications", JSON.stringify(existing));
    } catch (e) {
      console.warn("Failed to push notification", e.message);
    }
  };

  const handleStatusChange = async (requestId, status, requestData) => {
    try {
      await updateRequestStatus(requestId, status);
      setRequests((prev) =>
        prev.map((r) => (r._id === requestId || r.id === requestId ? { ...r, status } : r))
      );

      const accepted = status === 1;
      const taskTitle = requestData?.task_id?.title || "your task";
      const notif = {
        id: Date.now(),
        text: accepted
          ? `Your request for "${taskTitle}" was accepted.`
          : `Your request for "${taskTitle}" was rejected.`,
        time: new Date().toISOString(),
        unread: true,
      };
      pushNotification(notif);

      alert(accepted ? "Request accepted" : "Request rejected");
    } catch (e) {
      alert(e.message || "Failed to update request");
    }
  };

  //  Fixed search: filter using name and job
  const filteredRequests = requests.filter((req) =>
    `${req.name || ""} ${req.job || ""}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8">
      {/* Search Input */}
      <div className="mb-6 max-w-sm">
        <input
          type="text"
          placeholder="Search requests..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Request Cards List */}
      <div className="space-y-6 max-w-5xl">
        {loading && <p className="text-sm text-[#64748B]">Loading requests...</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {!loading && !filteredRequests.length && (
          <div className="bg-[#D8FFBB] border border-dashed border-[#3A5B22] rounded-xl p-12 text-center">
            <p className="text-[#3A5B22] font-medium">No matching requests found.</p>
          </div>
        )}

        {!loading &&
          filteredRequests.map((req) => {
            const name = req.name || "Requester";
            const message = req.message || "I want to work on the task you have provided and its description.";
            return (
              <RequestCard
                key={req._id || req.id}
                name={name}
                imageUrl={req.imageUrl || ""}
                rating={req.rating || 0}
                reviews={req.reviews || 0}
                time={req.time ? new Date(req.time).toLocaleString() : ""}
                distance={req.distance || ""}
                message={message}
                job={req.job || ""}
                duration={req.duration || ""}
                slot={req.slot || ""}
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
