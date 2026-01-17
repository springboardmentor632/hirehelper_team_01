import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Feed from "./pages/feed";
import MyTasks from "./pages/MyTasks";
import MyAddTask from "./pages/AddTask";
import Loader from "./pages/Loader";
import Requests from "./pages/Requests";
import MyRequests from "./pages/MyRequests";
import ProfileSettings from "./pages/ProfileSettings";

// Layout
import Layout from "./components/Layout";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-app">
        <Loader />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>

        {/* ALL PAGES WITH SIDEBAR */}
        <Route element={<Layout />}>
          <Route path="/" element={<Feed />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/mytasks" element={<MyTasks />} />
          <Route path="/addtask" element={<MyAddTask />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/myrequests" element={<MyRequests />} />
          <Route path="/profile" element={<ProfileSettings />} />
          <Route path="/settings" element={<ProfileSettings />} />
        </Route>

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
