import styles from "../../css/project-option.module.css";
import Bookmark from "../../assets/icon/bookmark.svg";
import Delete from "../../assets/icon/delete.svg";
import useLockScroll from "../../hooks/useLockScroll";
import PropTypes from "prop-types";
import { forwardRef, useRef } from "react";
import useClickOutside from "../../hooks/useClickOutSide";

const ProjectOptionModal = forwardRef(({ setIsOptionOpen }, ref) => {
  useLockScroll(true);
  const optionRef = useRef(null);
  useClickOutside([ref, optionRef], () => setIsOptionOpen(false));
  return (
    <div className={`${styles.modalContainer} modal-container`} ref={optionRef}>
      <div className={styles.wrapper}>
        <button className={`${styles.icon} icon-button`}>
          <div className="default-icon">
            <img src={Bookmark} />
          </div>
          <span>즐겨찾기</span>
        </button>
        <button className={`${styles.icon} icon-button`}>
          <div className="default-icon">
            <img src={Delete} />
          </div>
          <span>삭제하기</span>
        </button>
      </div>
    </div>
  );
});

ProjectOptionModal.propTypes = {
  setIsOptionOpen: PropTypes.func.isRequired,
};

ProjectOptionModal.displayName = "ProjectOptionModal";
export default ProjectOptionModal;
