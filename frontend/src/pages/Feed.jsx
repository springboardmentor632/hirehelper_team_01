import "./Feed.css";
import tasks from "../data/tasks";
import TaskCard from "../components/TaskCard";

const Feed = () => {
  return (
    <div className="feed">
      <h1>Feed</h1>
      <p className="subtitle">Find tasks you can help with.</p>

      {/* Filters */}
      <div className="filters">
        <input type="text" placeholder="Search tasks..." />
        <select>
            <option>Category</option>
            <option>Moving</option>
            <option>Shopping</option>
            <option>Cleaning</option>
            <option>Delivery</option>
            <option>Other</option>
        </select>
        <select>
          <option>Location</option>
          <option>New York</option>
          <option>Los Angeles</option>
          <option>Chicago</option>
          <option>Houston</option>
          <option>Other</option>
        </select>
        <input type="date" />
      </div>

      {/* Task Cards */}
      <div className="cards">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Feed;