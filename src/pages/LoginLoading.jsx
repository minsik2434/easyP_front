import { useEffect } from "react";
import httpService from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../utils/authStore";
import { useMemberInfo } from "../utils/memberInfo";
function LoginLoading() {
  const { setAccessToken } = useAuthStore();
  const { setMemberInfo } = useMemberInfo();
  const urlParams = new URL(location.href).searchParams;
  const code = urlParams.get("code");
  const type = urlParams.get("state");
  const nav = useNavigate();
  useEffect(() => {
    const parsingMemberInfo = (data) => {
      const memberInfo = {
        email: data.email,
        name: data.name,
        profile: data.profile,
        role: data.role,
      };
      setMemberInfo(memberInfo);
    };
    const authenticate = async () => {
      const requestBody = {
        code: code,
      };
      if (code) {
        try {
          const response = await httpService.post(
            `/member/oauth2/${type}/login`,
            requestBody,
            { skipAuth: true }
          );
          console.log(response.data.accessToken);
          setAccessToken(response.data.accessToken);
          parsingMemberInfo(response.data);
          nav("/");
        } catch (error) {
          console.error("Authentication failed", error);
        }
      }
    };
    authenticate();
  }, [code, nav, setAccessToken, setMemberInfo, type]);
}
export default LoginLoading;
