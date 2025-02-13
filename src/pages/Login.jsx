import "../css/Login.css";
import httpService from "../utils/axiosClient";
import GoogleIcon from "../assets/icon/google.svg";
import KakaoIcon from "../assets/icon/kakao.svg";
import SocialLoginBt from "../components/SocialLoginBT";

function Login() {
  const googleAuth = async () => {
    await httpService
      .get("/member/oauth2/google/requestUri", {
        skipAuth: true,
      })
      .then((response) => {
        window.location.href = response.data;
      });
  };

  const kakaoAuth = async () => {
    await httpService
      .get("/member/oauth2/kakao/requestUri", {
        skipAuth: true,
      })
      .then((response) => {
        window.location.href = response.data;
      });
  };

  return (
    <div className="login_wrap">
      <div className="login_frame">
        <div className="description">
          <span>EasyP</span>
        </div>
        <span className="tag">로그인 하기</span>
        <div className="oauth_button_wrap">
          <div>
            <SocialLoginBt
              onClick={googleAuth}
              Icon={GoogleIcon}
              buttonType="google"
            />
            <SocialLoginBt
              onClick={kakaoAuth}
              Icon={KakaoIcon}
              buttonType="kakao"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
