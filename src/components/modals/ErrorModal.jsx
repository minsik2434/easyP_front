import { useRef } from "react";
import styles from "../../css/error.module.css";
import Error from "../../assets/icon/error.svg";
import useClickOutside from "../../hooks/useClickOutSide";
const ErrorModal = ({ setModal, title, content }) => {
  const modalRef = useRef();
  useClickOutside([modalRef], () => setModal(false));
  return (
    <div className={styles.container} ref={modalRef}>
      <div className={styles.title}>
        <div className={`default-icon`}>
          <img src={Error} />
        </div>
        <span>{title}</span>
      </div>
      <div className={styles.content}>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default ErrorModal;
