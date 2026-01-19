import React from "react";
import { MapPin, Calendar, CheckCircle, Clock } from "lucide-react";

const MyRequestCard = ({ 
  taskTitle, 
  recipientName, 
  recipientImage, 
  message, 
  location, 
  dateTime, 
  status 
}) => {
  return (
    <div className="bg-[#D8FFBB] border border-[#3A5B22] rounded-xl p-6 shadow-sm mb-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-[#1E293B] mb-1">{taskTitle}</h3>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200 border border-[#3A5B22]/20">
              {recipientImage ? (
                <img src={recipientImage} alt={recipientName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#3A5B22] text-white text-[10px]">
                  {recipientName?.charAt(0)}
                </div>
              )}
            </div>
            <p className="text-sm text-[#475569]">
              Request sent to <span className="font-semibold">{recipientName}</span>
            </p>
          </div>
        </div>

        {/* Status Badge - Now handles Accepted vs Pending */}
        {status === "Accepted" ? (
          <div className="flex items-center gap-1 bg-white/50 text-[#166534] px-3 py-1 rounded-full border border-[#BBF7D0] text-sm font-medium">
            <CheckCircle size={16} />
            Accepted
          </div>
        ) : (
          <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-200 text-sm font-medium">
            <Clock size={16} />
            Pending
          </div>
        )}
      </div>

      {/* Content Grid - 5 column layout to maximize message breadth */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-6">
        
        {/* Left: Message - Spans 4 out of 5 columns (80% width) */}
        <div className="md:col-span-4">
          <h4 className="text-sm font-bold text-[#1E293B] mb-2">Your Message</h4>
          <div className="bg-white/60 rounded-lg p-4 text-sm text-[#475569] italic border border-white/40 min-h-[80px]">
            "{message}"
          </div>
        </div>

        {/* Right: Task Details - Spans 1 column (20% width) and sticks to right */}
        <div className="flex flex-col justify-end md:items-end">
          <h4 className="text-sm font-bold text-[#1E293B] mb-2">Task Details</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#475569] text-sm justify-end">
              <span className="text-right">{location}</span>
              <MapPin size={16} className="text-[#3A5B22] shrink-0" />
            </div>
            <div className="flex items-center gap-2 text-[#475569] text-sm justify-end">
              <span className="text-right">{dateTime}</span>
              <Calendar size={16} className="text-[#3A5B22] shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRequestCard;