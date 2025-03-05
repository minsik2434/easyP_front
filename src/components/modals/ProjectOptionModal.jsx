import styles from "../../css/project-option.module.css";
import Bookmark from "../../assets/icon/bookmark.svg";
import Bookmark2 from "../../assets/icon/bookmark2.svg";
import Delete from "../../assets/icon/delete.svg";
import useLockScroll from "../../hooks/useLockScroll";
import PropTypes from "prop-types";
import { forwardRef, useRef } from "react";
import useClickOutside from "../../hooks/useClickOutSide";

const ProjectOptionModal = forwardRef(
  (
    {
      setIsOptionOpen,
      removeBookmark,
      addBookmark,
      isBookmarking,
      leaveProject,
    },
    ref
  ) => {
    useLockScroll(true);
    const optionRef = useRef(null);
    useClickOutside([ref, optionRef], () => setIsOptionOpen(false));
    console.log(isBookmarking);
    return (
      <div
        className={`${styles.modalContainer} modal-container`}
        ref={optionRef}
      >
        <div className={styles.wrapper}>
          <button
            className={`${styles.icon} icon-button`}
            onClick={(e) => {
              e.stopPropagation();
              if (isBookmarking) {
                removeBookmark();
              } else {
                addBookmark();
              }
              setIsOptionOpen(false);
            }}
          >
            <div className="default-icon">
              {isBookmarking === false ? (
                <img src={Bookmark} />
              ) : (
                <img src={Bookmark2} />
              )}
            </div>
            {isBookmarking === false ? (
              <span>즐겨찾기</span>
            ) : (
              <span>즐겨찾기 해제</span>
            )}
          </button>
          <button
            className={`${styles.icon} icon-button`}
            onClick={(e) => {
              e.stopPropagation();
              leaveProject();
            }}
          >
            <div className="default-icon">
              <img src={Delete} />
            </div>
            <span>나가기</span>
          </button>
        </div>
      </div>
    );
  }
);

ProjectOptionModal.propTypes = {
  setIsOptionOpen: PropTypes.func.isRequired,
  removeBookmark: PropTypes.func.isRequired,
  addBookmark: PropTypes.func.isRequired,
  isBookmarking: PropTypes.bool.isRequired,
  leaveProject: PropTypes.func.isRequired,
};

ProjectOptionModal.displayName = "ProjectOptionModal";
export default ProjectOptionModal;
