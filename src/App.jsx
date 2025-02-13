import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import LoginLoading from "./pages/LoginLoading";
import Landing from "./pages/Landing";
import Project from "./pages/Project";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login/oauth2/loading" element={<LoginLoading />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/project" element={<Project />} />
      </Routes>
    </>
  );
}

export default App;
