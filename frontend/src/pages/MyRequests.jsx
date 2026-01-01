import React from "react";
import MyRequestCard from "../components/MyRequestCard";

const MyRequests = () => {
  // Mock Data
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
    <div className="p-6 lg:p-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#1E293B]">My Requests</h1>
        <p className="text-[#475569] mt-1">
          Track the status of all the task requests you've sent.
        </p>
      </header>

      <div className="space-y-6 max-w-5xl">
        {myRequestsData.map((request) => (
          <MyRequestCard key={request.id} {...request} />
        ))}
      </div>
    </div>
  );
};

export default MyRequests;