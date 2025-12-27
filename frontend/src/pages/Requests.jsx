import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import RequestCard from "../components/RequestCard";
import { Bell } from "lucide-react";

/* ---------------- MOCK DATA ---------------- */
const mockRequests = [
  {
    id: 1,
    name: "Scott Johnson",
    rating: "4.8",
    reviews: 18,
    time: "1 hour ago",
    distance: "2km away",
    message:
      "I'd be happy to help with your computer setup. I have 5+ years of IT experience.",
    job: "Computer Setup Help",
    duration: "1-2 hrs",
    slot: "2:00 PM - 4:00 PM",
    imageUrl: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 2,
    name: "Alex Martin",
    rating: "4.6",
    reviews: 12,
    time: "30 mins ago",
    distance: "1.5km away",
    message:
      "Experienced technician available for laptop repair and configuration.",
    job: "Laptop Repair",
    duration: "1 hr",
    slot: "5:00 PM - 6:00 PM",
    imageUrl: "",
  },
  {
    id: 3,
    name: "Chris Evans",
    rating: "4.9",
    reviews: 22,
    time: "10 mins ago",
    distance: "3km away",
    message:
      "Professional electrician for home wiring and appliance fixing.",
    job: "Electrician Service",
    duration: "2 hrs",
    slot: "6:00 PM - 8:00 PM",
    imageUrl: "",
  },
];

/* ---------------- PAGE ---------------- */
const Requests = () => {
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredRequests = mockRequests.filter((req) =>
    `${req.name} ${req.job} ${req.message}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full flex bg-[#C7F5A5]">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      {/* Mobile Hamburger - RIGHT SIDE */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-6 right-6 z-50 p-2 bg-[#3A5B22] text-white rounded-md text-2xl"
      >
        {isSidebarOpen ? "✕" : "☰"}
      </button>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1E293B]">Requests</h1>
            <p className="mt-2 text-[#64748B]">
              Accept or decline requests to help with your tasks
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative w-64">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tasks..."
                className="w-full px-4 py-2 pl-10 rounded-lg border bg-white focus:ring-2 focus:ring-[#3A5B22]"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                🔍
              </span>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <Bell className="text-[#3A5B22]" />
              {filteredRequests.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {filteredRequests.length}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Request Cards */}
        <div className="space-y-6">
          {filteredRequests.length ? (
            filteredRequests.map((req) => (
              <RequestCard
                key={req.id}
                {...req}
                search={search}
                onAccept={() => console.log("Accepted", req.id)}
                onDecline={() => console.log("Declined", req.id)}
              />
            ))
          ) : (
            <p className="text-[#64748B]">No matching requests</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Requests;
