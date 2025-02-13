import PropTypes from "prop-types";
import "../css/Login.css";
function SocialLoginBt({ onClick, Icon, buttonType }) {
  const buttonText = buttonType.charAt(0).toUpperCase() + buttonType.slice(1);
  return (
    <button className={`${buttonType}-button`} onClick={() => onClick()}>
      <div className={`${buttonType}-button-state`}></div>
      <div className={`${buttonType}-button-content-wrapper`}>
        <div className={`${buttonType}-button-icon`}>
          <img src={Icon} />
        </div>
        <span className={`${buttonType}-button-contents`}>
          Continue with {buttonText}
        </span>
      </div>
    </button>
  );
}
SocialLoginBt.propTypes = {
  onClick: PropTypes.func.isRequired,
  Icon: PropTypes.string.isRequired,
  buttonType: PropTypes.string.isRequired,
};

export default SocialLoginBt;
