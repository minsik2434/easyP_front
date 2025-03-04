import styles from "../css/square-project.module.css";
import Dot from "../assets/icon/dot.svg";
import { useEffect, useRef, useState } from "react";
import ProjectOptionModal from "./modals/ProjectOptionModal";
import { parseDateTime } from "../utils/parseDateTime";
import { useAppStore } from "../utils/useAppStore";
import { useBookmarkState } from "../hooks/useBookmarkState";
import { useProjectOptionAction } from "../hooks/useProjectOptionAction";
import { useNavigate } from "react-router-dom";
function SquareProject({ project }) {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const buttonRef = useRef();
  const [modalPosition, setModalPosition] = useState("bottom");
  const updateAt = parseDateTime(project.updateAt);
  const { bookmarks } = useAppStore();
  const { isBookmarking, bookmarkId } = useBookmarkState(project.id, bookmarks);
  const { addBookmark, removeBookmark, leaveProject } = useProjectOptionAction(
    project.id,
    bookmarkId
  );
  const nav = useNavigate();
  useEffect(() => {
    if (isOptionOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const modalHeight = 200;
      if (window.innerHeight - rect.bottom < modalHeight) {
        setModalPosition("top");
      } else {
        setModalPosition("bottom");
      }
    }
  }, [isOptionOpen]);
  return (
    <div
      className={styles.container}
      onClick={() => nav(`/project/${project.id}/tasks`)}
    >
      <div className={styles.wrapper}>
        <div className={`default-icon ${styles.projectImgSize}`}>
          <img src={project.imgUrl} />
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
              <span className={styles.dateField}>{updateAt}</span>
            </div>
            <button
              ref={buttonRef}
              className={styles.settingButton}
              onClick={(e) => {
                e.stopPropagation();
                setIsOptionOpen((prev) => !prev);
              }}
            >
              <div className="default-icon">
                <img src={Dot} />
              </div>
            </button>
            {isOptionOpen && (
              <div
                className={`${
                  modalPosition === "top" ? styles.modalTop : styles.modalBottom
                }`}
              >
                <ProjectOptionModal
                  setIsOptionOpen={setIsOptionOpen}
                  addBookmark={addBookmark}
                  isBookmarking={isBookmarking}
                  removeBookmark={removeBookmark}
                  leaveProject={leaveProject}
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

export default SquareProject;
