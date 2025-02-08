import "../css/Login.css";
import axios from "axios";
import GoogleIcon from "../assets/icon/google.svg";
import KakaoIcon from "../assets/icon/kakao.svg";

function Login() {
  const googleAuth = async () => {
    await axios
      .get("http://localhost:8080/member/oauth2/google/requestUri")
      .then((response) => {
        window.location.href = response.data;
      });
  };

  const kakaoAuth = async () => {
    await axios
      .get("http://localhost:8080/member/oauth2/kakao/requestUri")
      .then((response) => {
        window.location.href = response.data;
      });
  };

  return (
    <>
      <div className="login_wrap">
        <div className="login_frame">
          <div className="description">
            {/* <span>easyP를 이용해 프로젝트를 간편하게 진행해보세요</span> */}
            <span className="tag">로그인 하기</span>
          </div>
          <div className="oauth_button_wrap">
            <div>
              <button
                className="gsi-material-button"
                onClick={() => googleAuth()}
              >
                <div className="gsi-material-button-state"></div>
                <div className="gsi-material-button-content-wrapper">
                  <div className="gsi-material-button-icon">
                    <img src={GoogleIcon} />
                  </div>
                  <span className="gsi-material-button-contents">
                    Continue with Google
                  </span>
                </div>
              </button>
              <button className="kakao-button" onClick={() => kakaoAuth()}>
                <div className="kakao-button-state"></div>
                <div className="kakao-button-content-wrapper">
                  <div className="kakao-button-icon">
                    <img src={KakaoIcon} />
                  </div>
                  <span className="kakao-button-contents">
                    Continue with Kakao
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
