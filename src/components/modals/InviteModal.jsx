import { useRef, useState } from "react";
import styles from "../../css/invite.module.css";
import useClickOutside from "../../hooks/useClickOutSide";
import Glass from "../../assets/icon/glass.svg";
import XIcon from "../../assets/icon/x.svg";
function InviteModal({ setIsInviteOpen }) {
  const modalRef = useRef();
  const [searchValue, setSearchValue] = useState("");
  useClickOutside([modalRef], () => setIsInviteOpen(false));
  return (
    <div className={styles.container} ref={modalRef}>
      <div className={styles.title}>
        <span>초대하기</span>
      </div>
      <div className={styles.searchContainer}>
        <span>이메일을 입력해주세요</span>
        <div className={styles.searchWrapper}>
          <div className={`default-icon ${styles.searchButtonIcon}`}>
            <img src={Glass} />
          </div>
          <input
            placeholder="email"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className={`${styles.xbutton} ${searchValue ? "" : styles.noValue}`}
            onClick={() => setSearchValue("")}
          >
            <div className={`${styles.searchBarButtonIcon} default-icon`}>
              <img src={XIcon} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default InviteModal;
