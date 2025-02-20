import "../../css/profile-modal.css";
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
    <div className="profile-modal-container" ref={modalRef}>
      <div className="member-info-wrapper">
        <div className="profile-icon">
          <img src={memberInfo.profile} />
        </div>
        <div className="member-info">
          <span>{memberInfo.name}</span>
          <span>{memberInfo.email}</span>
        </div>
      </div>
      <div className="menu-button-wrapper">
        <button className="menu-button">
          <div className="account-icon">
            <img src={Account} />
          </div>
          <span>계정</span>
        </button>
        <button className="menu-button">
          <div className="setting-icon">
            <img src={Setting} />
          </div>
          <span>설정</span>
        </button>
        <button className="menu-button">
          <div className="logout-icon">
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
