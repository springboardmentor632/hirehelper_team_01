import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import MyRequestCard from "../components/MyRequestCard";

const MyRequests = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mock Data based on your image
  const myRequestsData = [
    {
      id: 1,
      taskTitle: "Help Moving Furniture",
      recipientName: "Robert Wilson",
      recipientImage: "https://i.pravatar.cc/150?u=robert",
      message: "Hi Robert, I saw your post and I'd be happy to help you move on Saturday. I'm strong and have experience with moving heavy furniture. Let me know if that works for you!",
      location: "Downtown Central, USA",
      dateTime: "Sat, Oct 26th - 10:00 AM",
      status: "Accepted"
    },
    {
      id: 2,
      taskTitle: "Help Moving Furniture",
      recipientName: "Robert Wilson",
      recipientImage: "https://i.pravatar.cc/150?u=robert",
      message: "Hi Robert, I saw your post and I'd be happy to help you move on Saturday. I'm strong and have experience with moving heavy furniture. Let me know if that works for you!",
      location: "Downtown Central, USA",
      dateTime: "Sat, Oct 26th - 10:00 AM",
      status: "Accepted"
    }
  ];

  return (
    <div className="min-h-screen w-full flex bg-[#C7F5A5]">
      <Sidebar 
        isOpen={isSidebarOpen} 
        closeSidebar={() => setIsSidebarOpen(false)} 
      />

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-6 right-6 z-50 p-2 bg-[#3A5B22] text-white rounded-md"
      >
        {isSidebarOpen ? "✕" : "☰"}
      </button>

      <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-[#1E293B]">My Requests</h1>
          <p className="text-[#475569] mt-1">
            Track the status of all the task requests you've sent.
          </p>
        </header>

        <div className="max-w-5xl">
          {myRequestsData.map((request) => (
            <MyRequestCard key={request.id} {...request} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default MyRequests;