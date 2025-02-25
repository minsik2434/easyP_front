import styles from "../css/project.module.css";
import Account from "../assets/icon/account.svg";
import Dot from "../assets/icon/dot.svg";
import TestImage from "../assets/react.svg";
import { useRef, useState } from "react";
import ProjectOptionModal from "./modals/ProjectOptionModal";
import { parseDateTime } from "../utils/parseDateTime";
function Project({ project }) {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const buttonRef = useRef();
  const createAt = parseDateTime(project.createAt);
  const updateAt = parseDateTime(project.updateAt);
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
                <img src={project.owner.profile} />
              </div>
            </div>
            <div className={styles.info}>
              <span className={styles.title}>{project.name}</span>
              <span className={styles.dateField}>수정일:{updateAt}</span>
            </div>
            <button
              ref={buttonRef}
              className={styles.settingButton}
              onClick={() => {
                setIsOptionOpen((prev) => !prev);
              }}
            >
              <div className="default-icon">
                <img src={Dot} />
              </div>
            </button>
            {isOptionOpen && (
              <div className={styles.modal}>
                <ProjectOptionModal
                  setIsOptionOpen={setIsOptionOpen}
                  ref={buttonRef}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
