import styles from "../../css/profile-modal.module.css";
import { useMemberInfo } from "../../utils/memberInfo";
import Logout from "../../assets/icon/logout.svg";
import Setting from "../../assets/icon/setting.svg";
import Account from "../../assets/icon/account.svg";
import useLockScroll from "../../hooks/useLockScroll";
import { forwardRef, useContext, useRef } from "react";
import useClickOutside from "../../hooks/useClickOutSide";
import PropTypes from "prop-types";
import httpService from "../../utils/axiosClient";
import { useAuthStore } from "../../utils/authStore";
import { useNavigate } from "react-router-dom";
import { WebSocketContext } from "../../context/WebsocketProvider";
const ProfileModal = forwardRef(({ setProfileModal }, ref) => {
  useLockScroll(true);
  const modalRef = useRef(null);
  const { memberInfo, clearMemberInfo } = useMemberInfo();
  const { clearAccessToken } = useAuthStore();
  const nav = useNavigate();
  const { socket } = useContext(WebSocketContext);
  const logout = async () => {
    if (socket) {
      socket.close();
    }
    try {
      await httpService.post("/member/logout", {}, { skipAuth: true });
      clearMemberInfo();
      clearAccessToken();
      nav("/login");
    } catch (error) {
      console.log(error);
    }
  };
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
        <button
          className={`${styles.menuButton} icon-button`}
          onClick={() => logout()}
        >
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
