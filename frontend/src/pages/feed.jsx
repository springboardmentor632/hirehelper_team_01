import React, { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";
import { fetchFeed } from "../utils/api";

const Feed = () => {
  const [tasks, setTasks] = useState([]);

  // FILTER STATES
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(""); // <-- New state for date

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchFeed();
        if (mounted) setTasks(data);
      } catch (err) {
        console.error("Failed to load feed", err.message || err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // FILTER LOGIC
  const filteredTasks = tasks.filter((task) => {
    return (
      task.title?.toLowerCase().includes(search.toLowerCase()) &&
      (category === "" || task.category === category) &&
      (location === "" || task.location === location) &&
      (date === "" || task.date === date) // <-- Filter by date
    );
  });

  return (
    <div className="p-6 lg:p-10">
      {/* Filter / Search Bar */}
      <div className="flex flex-wrap gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2.5 pl-10 border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-action-accept bg-white"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2">🔍</span>
        </div>

        {/* Location */}
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-2.5 border border-border-default rounded-lg bg-white min-w-[120px]"
        >
          <option value="">Location</option>
          <option value="Remote">Remote</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
        </select>

        {/* Date */}
        <input
          type="date"
          value={date} // <-- bind state
          onChange={(e) => setDate(e.target.value)} // <-- update state
          className="p-2.5 border border-border-default rounded-lg bg-white"
        />
      </div>

      {/* Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <p className="text-gray-500">No tasks found</p>
        )}
      </div>
    </div>
  );
};

export default Feed;
