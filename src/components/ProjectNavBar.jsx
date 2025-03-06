import { Link, useLocation } from "react-router-dom";
import styles from "../css/project-nav-bar.module.css";
import Bookmark from "../assets/icon/bookmark.svg";
import ReactDOM from "react-dom";
import Bookmark2 from "../assets/icon/bookmark2.svg";
import httpService from "../utils/axiosClient";
import { useQueryClient } from "react-query";
import { useLayoutEffect, useRef, useState } from "react";
import Invite from "../assets/icon/invite.svg";
import InviteModal from "./modals/InviteModal";
function ProjectNavBar({ project, setProjectUpdate }) {
  const queryClient = useQueryClient();
  const location = useLocation();
  const tasksRef = useRef(null);
  const milestonesRef = useRef(null);
  const schedulesRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  useLayoutEffect(() => {
    let activeRef = null;
    if (location.pathname.includes("/tasks")) {
      activeRef = tasksRef;
    } else if (location.pathname.includes("/milestones")) {
      activeRef = milestonesRef;
    } else {
      activeRef = schedulesRef;
    }

    if (activeRef && activeRef.current) {
      const { offsetLeft, offsetWidth } = activeRef.current;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [location]);

  const addBookmark = async () => {
    try {
      await httpService.post(`/member/bookmark/${project.id}`);
      setProjectUpdate(true);
      queryClient.invalidateQueries("bookmarks");
    } catch (error) {
      console.log(error);
    }
  };
  const removeBookmark = async () => {
    try {
      await httpService.delete(`/member/bookmark/${project.bookmarkId}`);
      setProjectUpdate(true);
      queryClient.invalidateQueries("bookmarks");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.projectWrapper}>
        <div className={`default-icon ${styles.projectImageSize}`}>
          <img src={project.imgUrl} />
        </div>
        <div className={styles.optionButtonWrapper}>
          <div>
            <button
              className={`${styles.optionButton} icon-button`}
              onClick={() => {
                project.bookmarked ? removeBookmark() : addBookmark();
              }}
            >
              <div className={`${styles.optionButtonSize} default-icon`}>
                {project.bookmarked ? (
                  <img src={Bookmark2} />
                ) : (
                  <img src={Bookmark} />
                )}
              </div>
            </button>
          </div>
        </div>
        <div>
          <p className={styles.projectTitle}>{project.name}</p>
        </div>
      </div>
      <nav className={styles.navBar}>
        <ul className={styles.navList}>
          <li ref={tasksRef}>
            <Link
              className={styles.navLink}
              to={`/project/${project.id}/tasks`}
            >
              작업
            </Link>
          </li>
          <li ref={milestonesRef}>
            <Link
              className={styles.navLink}
              to={`/project/${project.id}/milestones`}
            >
              마엘스톤
            </Link>
          </li>
          <li ref={schedulesRef}>
            <Link
              className={styles.navLink}
              to={`/project/${project.id}/schedules`}
            >
              일정
            </Link>
          </li>
        </ul>
        <span
          className={styles.indicator}
          style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
        ></span>
      </nav>
      <div className={styles.inviteButtonWrapper}>
        <button
          className={styles.inviteButton}
          onClick={() => setIsInviteOpen((prev) => !prev)}
        >
          <div className={`default-icon`}>
            <img src={Invite} />
            <span>초대하기</span>
          </div>
        </button>
      </div>
      {isInviteOpen &&
        ReactDOM.createPortal(
          <div className={styles.modalOverlay}>
            <div className={`modal-container ${styles.inviteModal}`}>
              <InviteModal setIsInviteOpen={setIsInviteOpen} />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

export default ProjectNavBar;
