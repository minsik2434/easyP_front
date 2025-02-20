import "./app.css";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import LoginLoading from "./pages/LoginLoading";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/login/oauth2/loading" element={<LoginLoading />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
