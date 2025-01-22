import "../css/Login.scss";

function Login() {
  const onClick = () => {
    fetch("http://localhost:8080/login/google", {
      method: "GET",
      credentials: "include", // 쿠키를 사용하려면 포함
    })
      .then((response) => {
        if (response.redirected) {
          window.location.href = response.url; // Google 로그인 페이지로 리다이렉트
        }
      })
      .catch((error) => console.error("Error during login:", error));
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
