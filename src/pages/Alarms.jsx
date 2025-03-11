import { useState } from "react";
import styles from "../css/home.module.css";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { useAppStore } from "../utils/useAppStore";
import AlarmList from "../components/AlarmList";
import Notification from "../components/modals/Notification";

const Alarms = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const { notifications } = useAppStore();
  return (
    <div>
      <div className={styles.header}>
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
      <div className={`${styles.side} ${isSidebarOpen ? styles.open : ""}`}>
        <SideBar isSidebarOpen={isSidebarOpen} />
      </div>
      <div className={`${styles.main} ${isSidebarOpen ? styles.open : ""}`}>
        <AlarmList />
      </div>
      <div className={styles.notificationContainer}>
        {notifications.map((notif) => (
          <Notification key={notif.id} notification={notif} />
        ))}
      </div>
    </div>
  );
};

export default Alarms;
