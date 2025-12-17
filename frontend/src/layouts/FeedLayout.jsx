import "./Layout.css";
import Sidebar from "../components/Sidebar";
import Feed from "../pages/Feed";

const FeedLayout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <Feed />
    </div>
  );
};

export default FeedLayout;
