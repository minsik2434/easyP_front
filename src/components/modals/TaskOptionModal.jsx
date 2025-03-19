import { forwardRef, useRef } from "react";
import styles from "../../css/task-option.module.css";
import useClickOutside from "../../hooks/useClickOutSide";
const TaskOptionModal = forwardRef(({ setModal }, ref) => {
  const modalRef = useRef(null);
  useClickOutside([modalRef, ref], () => setModal(false));
  return (
    <div ref={modalRef} className={`${styles.container} modal-container`}>
      <div className={styles.buttonWrapper}>
        <button className={`icon-button`}>제목수정</button>
        <button className={`icon-button`}>내용수정</button>
        <button className={`icon-button`}>삭제</button>
      </div>
    </div>
  );
});

TaskOptionModal.displayName = "TaskOptionModal";
export default TaskOptionModal;
