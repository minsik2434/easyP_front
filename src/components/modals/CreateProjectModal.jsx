import { useRef } from "react";
import styles from "../../css/create-project.module.css";
import useClickOutside from "../../hooks/useClickOutSide";
function CreateProjectModal({ setIsCreateOpen }) {
  const modalRef = useRef();
  useClickOutside([modalRef], () => setIsCreateOpen(false));
  return (
    <div className={styles.container} ref={modalRef}>
      <div className={styles.headText}>
        <span>프로젝트 생성하기</span>
      </div>
      <div className={styles.title}>
        <span>제목</span>
        <div className={styles.titleWrapper}>
          <input placeholder="제목을 입력하세요" />
        </div>
      </div>
      <div className={styles.description}>
        <span>설명</span>
        <div className={styles.descriptionWrapper}>
          <textarea />
        </div>
      </div>
    </div>
  );
}

export default CreateProjectModal;
