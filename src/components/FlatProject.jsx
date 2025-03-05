import styles from "../css/flat-project.module.css";
import { parseDateTime } from "../utils/parseDateTime";
import Bookmark from "../assets/icon/bookmark.svg";
import Bookmark2 from "../assets/icon/bookmark2.svg";
import Delete from "../assets/icon/delete.svg";
import { useProjectOptionAction } from "../hooks/useProjectOptionAction";
import { useNavigate } from "react-router-dom";
function FlatProject({ project }) {
  const updateAt = parseDateTime(project.updateAt);
  const { addBookmark, removeBookmark, leaveProject } = useProjectOptionAction(
    project.id,
    project.bookmarkId
  );
  const nav = useNavigate();
  return (
    <div
      className={styles.container}
      onClick={() => nav(`/project/${project.id}/tasks`)}
    >
      <div className={styles.projectWrapper}>
        <div className={`default-icon ${styles.projectImgSize}`}>
          <img src={project.imgUrl} />
        </div>
        <div className={styles.descriptionWrapper}>
          <div className={`default-icon ${styles.profileImgSize}`}>
            <img src={project.owner.profile} />
          </div>
          <span>{project.name}</span>
        </div>
      </div>
      <div className={styles.updateWrapper}>
        <span className={styles.dateField}>{updateAt}</span>
      </div>
      <div className={styles.iconButtonWrapper}>
        <button
          className={`${styles.iconButton} icon-button`}
          onClick={(e) => {
            e.stopPropagation();
            if (project.bookmarked) {
              removeBookmark();
            } else {
              addBookmark();
            }
          }}
        >
          <div className={`${styles.iconButtonImgSize} default-icon`}>
            {project.bookmarked === false ? (
              <img src={Bookmark} />
            ) : (
              <img src={Bookmark2} />
            )}
          </div>
        </button>
        <button
          className={`${styles.iconButton} icon-button`}
          onClick={(e) => {
            e.stopPropagation();
            leaveProject();
          }}
        >
          <div className={`${styles.iconButtonImgSize} default-icon`}>
            <img src={Delete} />
          </div>
        </button>
      </div>
    </div>
  );
}
export default FlatProject;
