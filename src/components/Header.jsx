import "../css/header.css";
import { useMemberInfo } from "../utils/memberInfo";
import SearchIcon from "../assets/icon/glass.svg";
import SideClose from "../assets/icon/side-close.svg";
import XIcon from "../assets/icon/x.svg";
import Alarm from "../assets/icon/alarm.svg";
import Logo from "../assets/icon/Logo.svg";
import SideOpen from "../assets/icon/side-open.svg";
import { useEffect, useRef, useState } from "react";
import ProfileModal from "./modals/ProfileModal";
import PropTypes from "prop-types";
function Header({ isSidebarOpen, toggleSidebar }) {
  const { memberInfo } = useMemberInfo();
  const [searchValue, setSearchValue] = useState("");
  const [profileModal, setProfileModal] = useState(false);
  const profileRef = useRef();
  const profileButtonRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (
        profileModal &&
        profileRef.current &&
        !profileRef.current.contains(e.target) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(e.target)
      ) {
        setProfileModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);

    // 컴포넌트 언마운트 시 이벤트 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [profileModal]);
  return (
    <>
      <div className="header-container">
        <div className="main-nav-bar">
          <div className="side-bar-button-wrapper">
            <button className="open-button" onClick={() => toggleSidebar()}>
              {isSidebarOpen ? (
                <div className="side-bar-icon">
                  <img src={SideClose} />
                </div>
              ) : (
                <div className="side-bar-icon">
                  <img src={SideOpen} />
                </div>
              )}
            </button>
          </div>
          <div className="left-content">
            <button className="logo-button">
              <div className="logo-button-icon">
                <img src={Logo} />
              </div>
              <span>EasyP</span>
            </button>
          </div>
          <div className="center-content">
            <div className="search-bar-wrapper">
              <button
                className="search-button"
                onClick={() => {
                  inputRef.current.focus();
                }}
              >
                <div className="button-state" />
                <div className="search-button-icon">
                  <img src={SearchIcon} />
                </div>
              </button>
              <input
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                ref={inputRef}
                placeholder="검색창"
              />
              <button
                className={`clear-button ${searchValue ? "" : "no-value"}`}
                onClick={() => setSearchValue("")}
              >
                <div className="button-state" />
                <div className="clear-button-icon">
                  <img src={XIcon} />
                </div>
              </button>
            </div>
          </div>
          <div className="right-content">
            <div className="alarm-wrapper">
              <button className="info-button">
                <div className="button-state" />
                <div className="info-icon">
                  <img src={Alarm} alt="Alarm" />
                </div>
              </button>
            </div>
            <div className="profile-wrapper">
              <button
                ref={profileButtonRef}
                className="info-button"
                onClick={() => {
                  setProfileModal((prev) => !prev);
                }}
              >
                <div className="button-state" />
                <div className="info-icon">
                  <img src={memberInfo.profile} alt="Profile" />
                </div>
              </button>
              {profileModal && (
                <div ref={profileRef} className="modal">
                  <ProfileModal />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
Header.propTypes = {
  isSidebarOpen: PropTypes.string.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};
export default Header;
