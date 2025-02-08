import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginLoading() {
  const urlParams = new URL(location.href).searchParams;
  const code = urlParams.get("code");
  const type = urlParams.get("state");
  const nav = useNavigate();
  useEffect(() => {
    const authenticate = async () => {
      const requestBody = {
        code: code,
      };
      if (code) {
        try {
          const response = await axios.post(
            `http://localhost:8080/member/oauth2/${type}/login`,
            requestBody,
            { withCredentials: true },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          nav("/landing", {
            state: {
              accessToken: response.data.accessToken,
            },
          });
        } catch (error) {
          console.error("Authentication failed", error);
        }
      }
    };
    authenticate();
  }, [code, nav]);
}
export default LoginLoading;
