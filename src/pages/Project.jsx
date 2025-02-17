import { useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import "../css/test.css";
import ProjectList from "../components/ProjectList";
function Project() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="testcontiner">
      <div className="header">
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
      <div className={`side ${isSidebarOpen ? "open" : ""}`}>
        <SideBar isSidebarOpen={isSidebarOpen} />
      </div>
      <div className={`main ${isSidebarOpen ? "open" : ""}`}>
        <ProjectList />
      </div>
    </div>
  );
}
export default Project;
