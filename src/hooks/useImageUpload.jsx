import { useCallback, useState } from "react";
const validImageTypes = ["image/jpeg", "image/png", "image/webp"];
const maxFileSize = 5 * 1024 * 1024;
function useImageUpload() {
  const [contentImageUrl, setContentImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const readImage = useCallback((file) => {
    const reader = new FileReader();
    setImageFile(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => setContentImageUrl(reader.result);
  }, []);
  const validateImage = useCallback((file) => {
    if (!validImageTypes.includes(file.type)) {
      alert("이미지 파일만 추가해주세요");
      return false;
    }
    if (file.size > maxFileSize) {
      alert("최대 5MB 크기의 이미지만 추가 가능합니다");
      return false;
    }
    return true;
  }, []);

  const handleFile = useCallback(
    (file) => {
      if (file && validateImage(file)) {
        readImage(file);
      }
    },
    [readImage, validateImage]
  );
  return { contentImageUrl, imageFile, handleFile };
}

export default useImageUpload;
