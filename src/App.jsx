import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import LoginLoading from "./pages/LoginLoading";
import Landing from "./pages/Landing";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login/oauth2/loading" element={<LoginLoading />} />
        <Route path="/landing" element={<Landing />} />
      </Routes>
    </>
  );
}

export default App;
