import styles from "../css/flat-project.module.css";
import { parseDateTime } from "../utils/parseDateTime";
import Bookmark from "../assets/icon/bookmark.svg";
import Bookmark2 from "../assets/icon/bookmark2.svg";
import Delete from "../assets/icon/delete.svg";
import { useAppStore } from "../utils/useAppStore";
import httpService from "../utils/axiosClient";
function FlatProject({ project }) {
  const { bookmarks, setBookmarkUpdate } = useAppStore();
  const foundBookmark = bookmarks.find(
    (bookmark) => bookmark.projectDto.id === project.id
  );
  const isBookmarking = !!foundBookmark;
  const bookmarkId = foundBookmark ? foundBookmark.id : null;
  const updateAt = parseDateTime(project.updateAt);

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

  return (
    <div className={styles.container}>
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
          onClick={() => {
            if (isBookmarking) {
              httpRemoveBookmark();
            } else {
              httpAddBookmark();
            }
          }}
        >
          <div className={`${styles.iconButtonImgSize} default-icon`}>
            {isBookmarking === false ? (
              <img src={Bookmark} />
            ) : (
              <img src={Bookmark2} />
            )}
          </div>
        </button>
        <button className={`${styles.iconButton} icon-button`}>
          <div className={`${styles.iconButtonImgSize} default-icon`}>
            <img src={Delete} />
          </div>
        </button>
      </div>
    </div>
  );
}
export default FlatProject;
