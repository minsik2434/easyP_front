import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
function Landing() {
  const location = useLocation();
  const [responseData, setResponseData] = useState("");
  const [accessToken, setAccessToken] = useState(location.state.accessToken);
  useEffect(() => {
    const test = async () => {
      try {
        const response = await axios.get("http://localhost:8080/member/test", {
          headers: {
            Authorization: "Bearer " + location.state.accessToken,
          },
        });
        setResponseData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    test();
  }, [location.state.accessToken]);

  const refresh = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/member/refresh",
        {
          headers: { "Content-Type": "application/json" },
        },
        { withCredentials: true }
      );
      setAccessToken(response.data.accessToken);
    } catch (error) {
      console.error("Error data", error);
    }
  };
  return (
    <div>
      <span>테스트 요청 : {responseData}</span>
      <br />
      <span>AccessToken : {accessToken}</span>
      <br />
      <button onClick={() => refresh()}>새 AccessToken 받기</button>
    </div>
  );
}
export default Landing;
