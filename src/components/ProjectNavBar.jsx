import { Link, useNavigate } from "react-router-dom";
import styles from "../css/project-nav-bar.module.css";
import { useAppStore } from "../utils/useAppStore";
import { useBookmarkState } from "../hooks/useBookmarkState";
import Bookmark from "../assets/icon/bookmark.svg";
import Bookmark2 from "../assets/icon/bookmark2.svg";
import { useProjectOptionAction } from "../hooks/useProjectOptionAction";
function ProjectNavBar({ project }) {
  const { bookmarks } = useAppStore();
  const { isBookmarking, bookmarkId } = useBookmarkState(project.id, bookmarks);
  const { addBookmark, removeBookmark } = useProjectOptionAction(
    project.id,
    bookmarkId
  );
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
                if (isBookmarking) {
                  removeBookmark();
                } else {
                  addBookmark();
                }
              }}
            >
              <div className={`${styles.optionButtonSize} default-icon`}>
                {isBookmarking === false ? (
                  <img src={Bookmark} />
                ) : (
                  <img src={Bookmark2} />
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
        <ul>
          <li>
            <Link className={styles.navLink} to={"/"}>
              작업
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} to={"/"}>
              마엘스톤
            </Link>
          </li>
          <li></li>
        </ul>
      </nav>
    </div>
  );
}

export default ProjectNavBar;
