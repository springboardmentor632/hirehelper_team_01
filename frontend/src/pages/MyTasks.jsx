import React, { useEffect, useState } from "react";
import MyTaskCard from "../components/MyTaskCard";
import { fetchMyTasks, deleteTask } from "../utils/api";

const MyTasks = () => {
  const [myTasks, setMyTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load tasks
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

  // Delete task with confirmation
  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTask(taskId);

      // Optimistic UI update (instant removal)
      setMyTasks((prev) => prev.filter((task) => task._id !== taskId));

      alert("Task deleted successfully");
    } catch (err) {
      alert(err.message || "Failed to delete task");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="p-10 text-center text-text-secondary">
        Loading your tasks...
      </div>
    );
  }

  // Empty state
  if (!myTasks.length) {
    return (
      <div className="p-10 text-center text-text-secondary">
        No tasks created yet.
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10">
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
