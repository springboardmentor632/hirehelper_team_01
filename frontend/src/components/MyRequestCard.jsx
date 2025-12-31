import React from "react";
import { MapPin, Calendar, CheckCircle } from "lucide-react";

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
            <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200">
              {recipientImage ? (
                <img src={recipientImage} alt={recipientName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#3A5B22] text-white text-[10px]">
                  {recipientName.charAt(0)}
                </div>
              )}
            </div>
            <p className="text-sm text-[#475569]">
              Request sent to <span className="font-semibold">{recipientName}</span>
            </p>
          </div>
        </div>

        {/* Status Badge */}
        {status === "Accepted" && (
          <div className="flex items-center gap-1 bg-white/50 text-[#166534] px-3 py-1 rounded-full border border-[#BBF7D0] text-sm font-medium">
            <CheckCircle size={16} />
            Accepted
          </div>
        )}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Left: Message */}
        <div>
          <h4 className="text-sm font-bold text-[#1E293B] mb-2">Your Message</h4>
          <div className="bg-white/60 rounded-lg p-4 text-sm text-[#475569] italic border border-white/40">
            "{message}"
          </div>
        </div>

        {/* Right: Task Details */}
        <div className="flex flex-col justify-center">
          <h4 className="text-sm font-bold text-[#1E293B] mb-2 text-right md:text-left">Task Details</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-[#475569] text-sm justify-end md:justify-start">
              <MapPin size={18} className="text-[#3A5B22]" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-3 text-[#475569] text-sm justify-end md:justify-start">
              <Calendar size={18} className="text-[#3A5B22]" />
              <span>{dateTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRequestCard;