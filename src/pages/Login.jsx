import { useNavigate } from "react-router-dom";
import "../css/Login.css";

function Login() {
  const nav = useNavigate();

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
              <button>구글</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
