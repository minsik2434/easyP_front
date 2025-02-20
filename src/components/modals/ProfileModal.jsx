import styles from "../../css/profile-modal.module.css";
import { useMemberInfo } from "../../utils/memberInfo";
import Logout from "../../assets/icon/logout.svg";
import Setting from "../../assets/icon/setting.svg";
import Account from "../../assets/icon/account.svg";
import useLockScroll from "../../hooks/useLockScroll";
import { forwardRef, useRef } from "react";
import useClickOutside from "../../hooks/useClickOutSide";
import PropTypes from "prop-types";
const ProfileModal = forwardRef(({ setProfileModal }, ref) => {
  useLockScroll(true);
  const modalRef = useRef(null);
  const { memberInfo } = useMemberInfo();

  useClickOutside([ref, modalRef], () => setProfileModal(false));
  return (
    <div className={`${styles.modalContainer} modal-container`} ref={modalRef}>
      <div className={styles.infoWrapper}>
        <div className={`default-icon ${styles.profileIcon}`}>
          <img src={memberInfo.profile} />
        </div>
        <div className={styles.memberInfo}>
          <span>{memberInfo.name}</span>
          <span>{memberInfo.email}</span>
        </div>
      </div>
      <div className={styles.menuButtonWrapper}>
        <button className={`${styles.menuButton} icon-button`}>
          <div className="default-icon">
            <img src={Account} />
          </div>
          <span>계정</span>
        </button>
        <button className={`${styles.menuButton} icon-button`}>
          <div className="default-icon">
            <img src={Setting} />
          </div>
          <span>설정</span>
        </button>
        <button className={`${styles.menuButton} icon-button`}>
          <div className="default-icon">
            <img src={Logout} />
          </div>
          <span>로그아웃</span>
        </button>
      </div>
    </div>
  );
});
ProfileModal.propTypes = {
  setProfileModal: PropTypes.func.isRequired,
};
ProfileModal.displayName = "ProfileModal";
export default ProfileModal;
