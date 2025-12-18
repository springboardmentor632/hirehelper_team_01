import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FeedLayout from "./layouts/FeedLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/feed" />} />
        <Route path="/feed" element={<FeedLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
