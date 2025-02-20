import styles from "../css/project.module.css";
import Account from "../assets/icon/account.svg";
import Dot from "../assets/icon/dot.svg";
import TestImage from "../assets/react.svg";
import { useState } from "react";
import ProjectOptionModal from "./modals/ProjectOptionModal";
function Project() {
  const [isOptionOpen, setIsOptionOpen] = useState();
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={`default-icon ${styles.projectImgSize}`}>
          <img src={TestImage} />
        </div>
        <div className={styles.descriptionWrapper}>
          <div className={styles.projectDescription}>
            <div className={styles.masterWrapper}>
              <div className={`default-icon ${styles.masterIconSize}`}>
                <img src={Account} />
              </div>
            </div>
            <div className={styles.info}>
              <span className={styles.title}>UnDefind</span>
              <span>생성일</span>
            </div>
            <button
              className={styles.settingButton}
              onClick={() => setIsOptionOpen((prev) => !prev)}
            >
              <div className="default-icon">
                <img src={Dot} />
              </div>
            </button>
            {isOptionOpen && (
              <div className={styles.modal}>
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
