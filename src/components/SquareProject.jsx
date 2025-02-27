import styles from "../css/square-project.module.css";
import Dot from "../assets/icon/dot.svg";
import { useEffect, useRef, useState } from "react";
import ProjectOptionModal from "./modals/ProjectOptionModal";
import { parseDateTime } from "../utils/parseDateTime";
import httpService from "../utils/axiosClient";
import { useAppStore } from "../utils/useAppStore";
function SquareProject({ project }) {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const buttonRef = useRef();
  const [modalPosition, setModalPosition] = useState("bottom");
  const updateAt = parseDateTime(project.updateAt);
  const { bookmarks, setBookmarkUpdate } = useAppStore();
  const foundBookmark = bookmarks.find(
    (bookmark) => bookmark.projectDto.id === project.id
  );
  const isBookmarking = !!foundBookmark;
  const bookmarkId = foundBookmark ? foundBookmark.id : null;

  const httpAddBookmark = async () => {
    try {
      await httpService.post(`/member/bookmark/${project.id}`);
      setBookmarkUpdate(true);
    } catch (error) {
      console.log(error);
    }
  };
  const httpRemoveBookmark = async () => {
    try {
      await httpService.delete(`/member/bookmark/${bookmarkId}`);
      setBookmarkUpdate(true);
    } catch (error) {
      console.log(error);
    }
  };

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
    <div className={styles.container}>
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
              onClick={() => {
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
                  addBookmark={httpAddBookmark}
                  isBookmarking={isBookmarking}
                  removeBookmark={httpRemoveBookmark}
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
