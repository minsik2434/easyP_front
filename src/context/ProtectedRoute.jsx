import { useEffect, useState } from "react";
import { useAuthStore } from "../utils/authStore";
import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";
import WebSocketProvider from "./WebsocketProvider";

const ProtectedRoute = () => {
  const [isAuthCheck, setIsAuthCheck] = useState(false);
  const [isLogIn, setIsLogin] = useState(false);
  const { accessToken, setAccessToken } = useAuthStore();
  useEffect(() => {
    if (accessToken) {
      setIsAuthCheck(true);
      setIsLogin(true);
    } else {
      axios
        .post(
          "http://localhost:8080/member/refresh",
          {},
          { withCredentials: true }
        )
        .then((response) => {
          setAccessToken(response.data.accessToken);
          setIsLogin(true);
        })
        .catch((error) => {
          setIsLogin(false);
        })
        .finally(() => {
          setIsAuthCheck(true);
        });
    }
  }, [accessToken, setAccessToken]);

  if (!isAuthCheck) {
    return <div>loading...</div>;
  }

  if (!isLogIn) {
    return <Navigate to="/login" />;
  }
  return (
    <WebSocketProvider>
      <Outlet />
    </WebSocketProvider>
  );
};

export default ProtectedRoute;
