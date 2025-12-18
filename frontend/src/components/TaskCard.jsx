import "./TaskCard.css";
import {
  MdLocationOn,
  MdCalendarToday,
  MdPerson,
  MdSend,
} from "react-icons/md";

const TaskCard = ({ task }) => {
  return (
    <div className="task-card">
      
      {/* IMAGE HEADER (dynamic per card) */}
      <div className="task-icon">
        <img src={task.image} alt={task.title} />
      </div>

      <div className="task-content">
        <h3>{task.title}</h3>
        <p className="desc">{task.description}</p>

        <p className="info">
          <MdLocationOn /> {task.location}
        </p>

        <p className="info">
          <MdCalendarToday /> {task.date}
        </p>

        <div className="task-footer">
          <span className="user">
            <MdPerson /> {task.user}
          </span>

          <button className="request-btn">
            <MdSend /> Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard; 