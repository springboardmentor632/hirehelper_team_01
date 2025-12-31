import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import RequestCard from "../components/RequestCard";
import { Bell } from "lucide-react";

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
    imageUrl: null, // Will trigger initials fallback
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

const Requests = ({ requests = MOCK_REQUESTS }) => {
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Filter requests based on search input
  const filteredRequests = requests.filter((req) =>
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
