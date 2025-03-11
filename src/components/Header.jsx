import styles from "../css/header.module.css";
import { useMemberInfo } from "../utils/memberInfo";
import SideClose from "../assets/icon/side-close.svg";
import Alarm from "../assets/icon/alarm.svg";
import Logo from "../assets/icon/Logo.svg";
import SideOpen from "../assets/icon/side-open.svg";
import { useLayoutEffect, useRef, useState } from "react";
import ProfileModal from "./modals/ProfileModal";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import httpService from "../utils/axiosClient";
import { useAppStore } from "../utils/useAppStore";
function Header({ isSidebarOpen, toggleSidebar }) {
  const { memberInfo } = useMemberInfo();
  const [profileModal, setProfileModal] = useState(false);
  const profileButtonRef = useRef();
  const nav = useNavigate();
  const [notificationCount, setNotificationCount] = useState();
  const { notifications, notificationUpdate } = useAppStore();
  useLayoutEffect(() => {
    const getNotificationCount = async () => {
      try {
        const response = await httpService.get(
          "/member/notifications/noRead/count"
        );
        setNotificationCount(response.data.count);
      } catch (error) {
        console.log(error);
      }
    };
    getNotificationCount();
  }, [notifications, notificationUpdate]);
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
          <Link to={"/"} className={styles.logoButton}>
            <div className="default-icon">
              <img src={Logo} />
            </div>
            <span>EasyP</span>
          </Link>
        </div>
        <div className={styles.rightContent}>
          <div className={styles.iconButtonWrapper}>
            <button
              className={styles.iconButton}
              onClick={() => {
                nav("/alarm");
              }}
            >
              <div className={styles.buttonState} />
              <div className={`default-icon ${styles.iconSize}`}>
                <img src={Alarm} alt="Alarm" />
              </div>
              {notificationCount !== 0 && (
                <div className={styles.notificationCount}>
                  <span>{notificationCount}</span>
                </div>
              )}
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
