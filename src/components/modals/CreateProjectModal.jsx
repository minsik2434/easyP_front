import { useRef, useState } from "react";
import styles from "../../css/create-project.module.css";
import useClickOutside from "../../hooks/useClickOutSide";
import useImageUpload from "../../hooks/useImageUpload";
import ImageLoader from "../ImageLoader";
function CreateProjectModal({ setIsCreateOpen }) {
  const modalRef = useRef();
  useClickOutside([modalRef], () => setIsCreateOpen(false));
  const [inputValue, setInputValue] = useState({
    title: "",
    description: "",
    image: "",
  });
  const { contentImageUrl, imageFile, handleFile } = useImageUpload();
  console.log(imageFile);
  return (
    <div className={styles.container} ref={modalRef}>
      <div className={styles.headText}>
        <span>프로젝트 생성하기</span>
      </div>
      <div className={styles.title}>
        <span>제목</span>
        <div className={styles.titleWrapper}>
          <input
            placeholder="제목을 입력하세요"
            onChange={(e) => {
              setInputValue({
                ...inputValue,
                title: e.target.value,
              });
            }}
          />
        </div>
      </div>
      <div className={styles.description}>
        <span>설명</span>
        <div className={styles.descriptionWrapper}>
          <textarea
            placeholder="설명을 입력하세요"
            onChange={(e) => {
              setInputValue({ ...inputValue, description: e.target.value });
            }}
          />
        </div>
      </div>
      <ImageLoader
        contentImageUrl={contentImageUrl}
        onFileSelect={handleFile}
      />
      <div>
        <button>등록하기</button>
      </div>
    </div>
  );
}

export default CreateProjectModal;
