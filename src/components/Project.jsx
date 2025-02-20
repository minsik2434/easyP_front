import "../css/project.css";
import Account from "../assets/icon/account.svg";
import Dot from "../assets/icon/dot.svg";
import TestImage from "../assets/react.svg";
import { useState } from "react";
import ProjectOptionModal from "./modals/ProjectOptionModal";
function Project() {
  const [isOptionOpen, setIsOptionOpen] = useState();
  return (
    <div className="project-container">
      <div className="project-wrapper">
        <div className="project-img">
          <img src={TestImage} />
        </div>
        <div className="project-description-wrapper">
          <div className="project-description">
            <div className="master-wrapper">
              <div className="master-icon">
                <img src={Account} />
              </div>
            </div>
            <div className="info">
              <span className="title">UnDefind</span>
              <span>생성일</span>
            </div>
            <button
              className="setting-button"
              onClick={() => setIsOptionOpen((prev) => !prev)}
            >
              <div className="setting-icon">
                <img src={Dot} />
              </div>
            </button>
            {isOptionOpen && (
              <div className="modal">
                <ProjectOptionModal />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
