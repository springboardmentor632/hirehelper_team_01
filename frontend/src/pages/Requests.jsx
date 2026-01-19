import React, { useState, useEffect } from 'react';
import RequestCard from '../components/RequestCard';
import { fetchIncomingRequests, acceptRequest, declineRequest } from '../utils/api';

const Requests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const loadRequests = async () => {
        try {
            setLoading(true);
            const data = await fetchIncomingRequests();
            setRequests(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch requests:", err);
            setRequests([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRequests();
    }, []);

    const handleAccept = async (requestId) => {
        try {
            await acceptRequest(requestId);
            setRequests(prev => prev.map(req => 
                req._id === requestId ? { ...req, status: 1 } : req
            ));
        } catch (err) {
            alert(err.message || "Failed to accept request");
        }
    };

    const handleDecline = async (requestId) => {
        if (!window.confirm("Are you sure you want to decline this request?")) return;
        try {
            await declineRequest(requestId);
            setRequests(prev => prev.filter(req => req._id !== requestId));
        } catch (err) {
            alert(err.message || "Failed to decline request");
        }
    };

    // Filter requests based on search term (name or job title)
    const filteredRequests = requests.filter(req => {
        const fullName = `${req.requester_id?.first_name} ${req.requester_id?.last_name}`.toLowerCase();
        const jobTitle = req.task_id?.title?.toLowerCase() || "";
        return fullName.includes(searchTerm.toLowerCase()) || jobTitle.includes(searchTerm.toLowerCase());
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#3A5B22]"></div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl mx-auto pb-10">
            {/* Search Bar with increased upper margin */}
<div className="mt-10 mb-8"> 
    <input 
        type="text" 
        placeholder="Search requests..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-md p-3 px-4 border border-[#CBD5E1] rounded-md shadow-sm outline-none focus:ring-2 focus:ring-[#3A5B22]/50 bg-white"
    />
</div>

            {filteredRequests.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {filteredRequests.map(req => (
                        <RequestCard 
                            key={req._id} 
                            name={`${req.requester_id?.first_name || 'Requester'} ${req.requester_id?.last_name || ''}`.trim()}
                            imageUrl={req.requester_id?.profile_picture}
                            job={req.task_id?.title || "Task"}
                            message={req.message}
                            status={req.status}
                            search={searchTerm}
                            rating="0"
                            reviews="0"
                            time="Recently"
                            distance="Nearby"
                            duration="Flexible"
                            slot="Anytime"
                            onAccept={() => handleAccept(req._id)}
                            onDecline={() => handleDecline(req._id)}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-24 bg-white/40 rounded-3xl border-2 border-dashed border-[#3A5B22]/20">
                    <span className="text-6xl mb-4 opacity-40">📬</span>
                    <h2 className="text-xl font-bold text-[#1E293B]">No requests found</h2>
                    <p className="text-[#64748B]">When people want to help, their requests will appear here.</p>
                </div>
            )}
        </div>
    );
};

export default Requests;