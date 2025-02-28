import { useState } from "react";
import DropBox from "../assets/icon/dropbox.svg";
import styles from "../css/create-project.module.css";
function ImageLoader({ contentImageUrl, onFileSelect }) {
  const [isActive, setIsActive] = useState(false);
  const handleDragStart = () => setIsActive(true);
  const handleDragEnd = () => setIsActive(false);
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    onFileSelect(file);
    setIsActive(false);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onFileSelect(file);
  };
  return (
    <div className={styles.imageDnd}>
      <span>대표이미지 등록</span>
      <label
        className={`${styles.preview} ${isActive ? styles.active : ""}`}
        onDragEnter={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input type="file" onChange={handleFileChange} />
        {contentImageUrl ? (
          <div className={`default-icon ${styles.previewImageSize}`}>
            <img src={contentImageUrl} />
          </div>
        ) : (
          <div className={`default-icon ${styles.iconSize}`}>
            <img src={DropBox} />
          </div>
        )}
        {!contentImageUrl && (
          <p className={styles.imageBoxText}>
            클릭 또는 파일을 이곳에 드롭하세요
          </p>
        )}
      </label>
    </div>
  );
}
export default ImageLoader;
