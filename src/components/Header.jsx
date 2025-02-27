import styles from "../css/header.module.css";
import { useMemberInfo } from "../utils/memberInfo";
import SearchIcon from "../assets/icon/glass.svg";
import SideClose from "../assets/icon/side-close.svg";
import XIcon from "../assets/icon/x.svg";
import Alarm from "../assets/icon/alarm.svg";
import Logo from "../assets/icon/Logo.svg";
import SideOpen from "../assets/icon/side-open.svg";
import { useRef, useState } from "react";
import ProfileModal from "./modals/ProfileModal";
import PropTypes from "prop-types";
function Header({ isSidebarOpen, toggleSidebar }) {
  const { memberInfo } = useMemberInfo();
  const [searchValue, setSearchValue] = useState("");
  const [profileModal, setProfileModal] = useState(false);
  const profileButtonRef = useRef();
  const inputRef = useRef();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.sideBarButtonWrapper}>
          <button
            className={`${styles.sideToggleButton} icon-button `}
            onClick={() => toggleSidebar()}
          >
            {isSidebarOpen ? (
              <div className="default-icon">
                <img src={SideClose} />
              </div>
            ) : (
              <div className="default-icon">
                <img src={SideOpen} />
              </div>
            )}
          </button>
        </div>
        <div className={styles.leftContent}>
          <button className={styles.logoButton}>
            <div className="default-icon">
              <img src={Logo} />
            </div>
            <span>EasyP</span>
          </button>
        </div>
        <div className={styles.rightContent}>
          <div className={styles.iconButtonWrapper}>
            <button className={styles.iconButton}>
              <div className={styles.buttonState} />
              <div className={`default-icon ${styles.iconSize}`}>
                <img src={Alarm} alt="Alarm" />
              </div>
            </button>
          </div>
          <div className={styles.iconButtonWrapper}>
            <button
              ref={profileButtonRef}
              className={styles.iconButton}
              onClick={() => {
                setProfileModal((prev) => !prev);
              }}
            >
              <div className={styles.buttonState} />
              <div className={`default-icon ${styles.iconSize}`}>
                <img src={memberInfo.profile} alt="Profile" />
              </div>
            </button>
            {profileModal && (
              <div className={styles.modal}>
                <ProfileModal
                  setProfileModal={setProfileModal}
                  ref={profileButtonRef}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
Header.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};
export default Header;
