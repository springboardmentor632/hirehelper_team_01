import React from "react";
import { useNavigate } from "react-router-dom";

const MyTaskCard = ({ task, onDelete }) => {
  const navigate = useNavigate();

  const statusText =
    typeof task.status === "number"
      ? task.status === 1
        ? "Active"
        : "Pending"
      : task.status;

  const dateStr = task.start_time
    ? new Date(task.start_time).toLocaleString()
    : "";

  return (
    <div className="w-full h-full bg-bg-highlight rounded-xl border-2 border-action-accept shadow-sm flex flex-col overflow-hidden">
      
      {/* IMAGE */}
      <div className="w-full aspect-video overflow-hidden bg-gray-200">
        <img
          src={
            task.picture && task.picture.trim() !== ""
              ? task.picture
              : "https://via.placeholder.com/400x225?text=No+Image"
          }
          alt={task.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold">{task.title}</h3>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-600">
            {statusText}
          </span>
        </div>

        <p className="text-sm text-text-secondary line-clamp-3">
          {task.description}
        </p>

        <div className="mt-auto space-y-2 text-xs text-[#3A5B22]/70">
          <div>📅 {dateStr}</div>
          <div>📍 {task.location}</div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3 pt-4 border-t border-action-accept/20">
          <button
            onClick={() => navigate(`/edit-task/${task._id}`)}
            className="flex-1 bg-action-accept text-white py-2 rounded-lg hover:brightness-95"
          >
            Update
          </button>

          <button
            onClick={() => onDelete(task._id)}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyTaskCard;
