import React, { useState } from "react";
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

const Requests = ({ requests = MOCK_REQUESTS }) => {
  const [search, setSearch] = useState("");

  // Filter requests based on search input
  const filteredRequests = requests.filter((req) =>
    `${req.name} ${req.job} ${req.message}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8">
      {/* Request Cards List */}
      <div className="space-y-6 max-w-5xl">
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
          <div className="bg-[#D8FFBB] border border-dashed border-[#3A5B22] rounded-xl p-12 text-center">
            <p className="text-[#3A5B22] font-medium">No matching requests found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;