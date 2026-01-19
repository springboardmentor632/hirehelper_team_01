import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyTaskCard from "../components/MyTaskCard";
import { fetchMyTasks, deleteTask } from "../utils/api";

const MyTasks = () => {
  const [myTasks, setMyTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await fetchMyTasks();
      setMyTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setMyTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // DELETE TASK with confirmation
  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;

    try {
      await deleteTask(taskId);
      setMyTasks((prev) => prev.filter((task) => task._id !== taskId));
      alert("Task deleted successfully");
    } catch (err) {
      alert(err.message || "Failed to delete task");
    }
  };

  // LOADING STATE
  if (loading) {
    return (
      <div className="p-10 text-center text-text-secondary">
        Loading tasks...
      </div>
    );
  }

  // EMPTY STATE
  if (!myTasks.length) {
    return (
      <div className="p-6 lg:p-10 min-h-screen bg-bg-app">
        <h1 className="text-2xl font-bold text-text-primary mb-6">
          My Tasks
        </h1>

        <div className="flex flex-col items-center justify-center py-20 bg-bg-highlight rounded-xl border-2 border-dashed border-action-accept">
          <div className="text-5xl mb-4">📝</div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            No tasks found
          </h2>
          <p className="text-text-secondary mb-6 text-center max-w-xs">
            You haven't posted any tasks yet. Start by creating your first task!
          </p>
          <button
            onClick={() => navigate("/addtask")}
            className="px-6 py-3 bg-action-accept text-action-decline font-bold rounded-md shadow-md hover:opacity-90 transition-all"
          >
            + Create New Task
          </button>
        </div>
      </div>
    );
  }

  // NORMAL TASK LIST
  return (
    <div className="p-6 lg:p-10 min-h-screen bg-bg-app">
      <h1 className="text-2xl font-bold text-text-primary mb-6">
        My Tasks
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {myTasks.map((task) => (
          <MyTaskCard
            key={task._id}
            task={task}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default MyTasks;
