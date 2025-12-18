import { useState } from "react";
import "./Feed.css";
import tasks from "../data/tasks";
import TaskCard from "../components/TaskCard";

const Feed = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  // Filtered tasks based on user input
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = category === "" || category === "Category" || task.category === category;

    const matchesLocation = location === "" || location === "Location" || task.location === location;

    const matchesDate = date === "" || task.date === date;

    return matchesSearch && matchesCategory && matchesLocation && matchesDate;
  });

  return (
    <div className="feed">
      <h1>Feed</h1>
      <p className="subtitle">Find tasks you can help with.</p>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Category</option>
          <option>Moving</option>
          <option>Shopping</option>
          <option>Cleaning</option>
          <option>Delivery</option>
          <option>Other</option>
        </select>
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option>Location</option>
          <option>Market Area</option>
          <option>Los Angeles</option>
          <option>Tech Park</option>
          <option>New York</option>
          <option>Other</option>
        </select>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      {/* Task Cards */}
      <div className="cards">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <p>No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default Feed;
