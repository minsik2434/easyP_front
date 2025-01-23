import { useNavigate } from "react-router-dom";
import "../css/Login.scss";

function Login() {
  const nav = useNavigate();
  // const onClick = () => {
  //   const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  //   const redirectUrl = import.meta.env.VITE_GOOGLE_REDIRECT_URL;
  //   const authenticationUrl = import.meta.env.VITE_GOOGLE_AUTHENTICATION_URL;
  //   window.location.href = `${authenticationUrl}?client_id=${clientId}&response_type=code&scope=email+profile&redirect_uri=${redirectUrl}`;
  // };

  const test = () => {
    nav("/loginLoading");
  };

  return (
    <>
      <div className="login_wrap">
        <div className="login_frame">
          <div className="description">
            <span>easyP를 이용해 프로젝트를 간편하게 진행해보세요</span>
            <span className="tag">로그인 하기</span>
          </div>
          <div className="login_default_box">
            <input
              className="input_box"
              placeholder={"이메일을 입력해주세요"}
              type="text"
            />
            <input
              className="input_box"
              placeholder={"비밀번호를 입력해주세요"}
              type="password"
            />
            <button>로그인</button>
          </div>
          <hr />
          <div>
            <div>
              <button onClick={test}>구글</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
