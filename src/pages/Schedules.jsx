import { useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import styles from "../css/home.module.css";
import TaskList from "../components/TaskList";
function Schedules() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div>
      <div className={styles.header}>
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
      <div className={`${styles.side} ${isSidebarOpen ? styles.open : ""}`}>
        <SideBar isSidebarOpen={isSidebarOpen} />
      </div>
      <div className={`${styles.main} ${isSidebarOpen ? styles.open : ""}`}>
        <TaskList />
      </div>
    </div>
  );
}

export default Schedules;
