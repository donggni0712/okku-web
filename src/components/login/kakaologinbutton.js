import axios from "axios";
import React, { useEffect } from "react";
import "./kakaologinbutton.css"; // CSS 파일을 import 합니다.

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const KAKAO_JS_KEY = process.env.REACT_APP_KAKAO_JS_KEY;

const KakaoLoginButton = ({ onLoginSuccess }) => {
  useEffect(() => {
    // 카카오 SDK 초기화
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JS_KEY); // 여기에 본인의 JavaScript 키를 입력하세요.
    }
  }, []);

  const handleLogin = async () => {
    window.Kakao.Auth.login({
      success: async function (authObj) {
        const tokens = (
          await axios.post(`${API_BASE_URL}/login/app/kakao`, {
            token: authObj.access_token,
          })
        ).data;
        onLoginSuccess(tokens);
      },
      fail: function (err) {
        console.error(err);
      },
    });
  };

  return (
    <button className="kakao-login-button" onClick={handleLogin}>
      <img src="assets/kakao.png" alt="카카오 로고" />
      로그인하고 무한으로 분석하기!
    </button>
  );
};

export default KakaoLoginButton;
