import "../css/Login.css";

function Login() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const redirectUrl = import.meta.env.VITE_GOOGLE_REDIRECT_URL;
  const onClick = () => {
    if (window.electron) {
      console.log("electron");
      window.electron.sendToMain("toMain", {
        message: "request-auth",
        clientId: clientId,
        redirectUrl: redirectUrl,
      });
    } else {
      console.log("web");
      googleAuth();
    }
  };
  const googleAuth = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&response_type=code&scope=email+profile&redirect_uri=${redirectUrl}`;
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
              <button onClick={onClick}>구글</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
