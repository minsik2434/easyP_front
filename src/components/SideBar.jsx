import "../css/sidebar.css";
import Dot from "../assets/icon/dot.svg";
import PropTypes from "prop-types";
function SideBar({ isSidebarOpen }) {
  return (
    <div className="side-bar-container">
      <div className="side-bar-content-wrapper">
        <button
          className={`side-bar-content-button ${isSidebarOpen ? "open" : ""}`}
        >
          <div className="side-bar-content-icon">
            <img src={Dot} />
          </div>
          {isSidebarOpen ? (
            <div className="side-bar-content-title"> title</div>
          ) : (
            ""
          )}
        </button>
      </div>
      <div className="side-bar-content-wrapper">
        <button
          className={`side-bar-content-button ${isSidebarOpen ? "open" : ""}`}
        >
          <div className="side-bar-content-icon">
            <img src={Dot} />
          </div>
          {isSidebarOpen ? (
            <div className="side-bar-content-title"> title</div>
          ) : (
            ""
          )}
        </button>
      </div>
    </div>
  );
}

SideBar.propTypes = {
  isSidebarOpen: PropTypes.string.isRequired,
};
export default SideBar;
