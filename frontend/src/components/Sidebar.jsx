import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";
import {
  MdFeed,
  MdTask,
  MdMail,
  MdSend,
  MdAddCircle,
  MdSettings,
  MdPerson
} from "react-icons/md";
import logo from "../assets/logo.png";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <img src={logo} alt="logo" />
        <h2>Hire a Helper</h2>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <Link to="/feed" className={location.pathname === "/feed" ? "active" : ""}>
          <MdFeed /> Feed
        </Link>
        <Link to="/mytasks">
          <MdTask /> My Tasks
        </Link>
        <Link to="/requests">
          <MdMail /> Requests
        </Link>
        <Link to="/myrequests">
          <MdSend /> My Requests
        </Link>
        <Link to="/addtask">
          <MdAddCircle /> Add Task
        </Link>
        <Link to="/settings">
          <MdSettings /> Settings
        </Link>
      </nav>

      {/* Profile */}
      <div className="sidebar-profile">
        <div className="avatar">
          <MdPerson />
        </div>
        <div>
          <p className="name">John Doe</p>
          <a href="/profile">View profile</a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
