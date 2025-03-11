import { createContext, useEffect, useState } from "react";
import { useAuthStore } from "../utils/authStore";
import { useAppStore } from "../utils/useAppStore";

// eslint-disable-next-line react-refresh/only-export-components
export const WebSocketContext = createContext(null);

const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { addNotification } = useAppStore();
  const { accessToken } = useAuthStore();
  useEffect(() => {
    if (!accessToken) return;
    const ws = new WebSocket(
      `ws://localhost:8080/ws/alarm?token=${accessToken}`
    );

    ws.onopen = () => {
      console.log("✅ WebSocket 연결 성공");
    };

    ws.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      addNotification(parsedData);
    };

    ws.onclose = () => {
      console.log("❌ WebSocket 연결 종료");
    };

    ws.onerror = (error) => {
      console.error("⚠️ WebSocket 오류:", error);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [accessToken, addNotification]);

  return (
    <WebSocketContext.Provider value={{ socket }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
