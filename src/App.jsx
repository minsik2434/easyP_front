import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import LoginLoading from "./pages/LoginLoading";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/loginLoading" element={<LoginLoading />} />
      </Routes>
    </>
  );
}

export default App;
