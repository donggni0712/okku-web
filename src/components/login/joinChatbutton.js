import React from "react";
import "./kakaologinbutton.css"; // CSS 파일을 import 합니다.
import ReactGA from "react-ga4";
import { track } from "@vercel/analytics";

const JoinChatButton = () => {
  const handleInvite = async () => {
    track("JoinChat");
    ReactGA.event({
      category: "JoinChat",
      action: `Clicked JoinChat button`,
    });
    window.location.href = "https://open.kakao.com/o/g3EpAvFg";
  };
  return (
    <button className="kakao-login-button" onClick={handleInvite}>
      <img src="assets/kakao.png" alt="카카오 로고" />
      문의하기
    </button>
  );
};

export default JoinChatButton;
