import "./app.css";
import Login from "./pages/Login";
import { Outlet, Route, Routes } from "react-router-dom";
import LoginLoading from "./pages/LoginLoading";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Milestones from "./pages/Milestones";
import Schedules from "./pages/Schedules";
import ProtectedRoute from "./context/ProtectedRoute";
import Alarms from "./pages/Alarms";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/login/oauth2/loading" element={<LoginLoading />} />
        <Route path="/landing" element={<Landing />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/project/:projectId/tasks" element={<Tasks />} />
          <Route
            path="/project/:projectId/milestones"
            element={<Milestones />}
          />
          <Route path="/project/:projectId/schedules" element={<Schedules />} />
          <Route path="/alarm" element={<Alarms />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
