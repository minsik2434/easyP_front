import httpService from "../utils/axiosClient";
import { useEffect, useState } from "react";
import { useAuthStore } from "../utils/authStore";
import { useMemberInfo } from "../utils/memberInfo";
function Landing() {
  const [responseData, setResponseData] = useState({
    email: "",
    name: "",
    profile: "",
    role: "",
  });
  const { accessToken } = useAuthStore();
  const { memberInfo } = useMemberInfo();
  useEffect(() => {
    const email = memberInfo.email;
    const test = async () => {
      try {
        const response = await httpService.get(`/member/${email}`);
        setResponseData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    test();
  }, [accessToken, memberInfo.email]);
  const accessTokenExpiredTest = async () => {
    const email = memberInfo.email;
    try {
      const response = await httpService.get(`/member/${email}`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>회원 이메일 : {responseData.email}</span>
        <span>회원 이름: {responseData.name}</span>
        <span>
          회원 프로필 사진 :
          <img
            src={responseData.profile}
            alt="Profile"
            width={20}
            height={20}
          />
        </span>
        <br />
        <span>AccessToken : {accessToken}</span>
        <br />
      </div>
      <button onClick={() => accessTokenExpiredTest()}>재요청</button>
    </div>
  );
}
export default Landing;
