import "../../css/modal.css";
import { useMemberInfo } from "../../utils/memberInfo";
import Logout from "../../assets/icon/logout.svg";
import Setting from "../../assets/icon/setting.svg";
import Account from "../../assets/icon/account.svg";
function ProfileModal() {
  const { memberInfo } = useMemberInfo();
  return (
    <div className="modal-container">
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
}
export default ProfileModal;
