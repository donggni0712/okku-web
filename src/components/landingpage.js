import React, { useState, useEffect } from "react";
import "./landingPage.css";
import KakaoLoginButton from "./login/kakaologinbutton";
import { useNavigate } from "react-router-dom";
import { usePopup } from "../context/PopupContext";
import ErrorPopup from "./popup/ErrorPopup";
import { getReviewsWithoutLogin } from "../api/getReviewsWithoutLogin";
import PickPageWithoutLogin from "../pages/pickPageWithoutLogin";
import { v4 as uuidv4 } from "uuid";
import LoginPopup from "./popup/LoginPopup";
import ReactGA from "react-ga4";
import { track } from "@vercel/analytics";

import AnalyzingComponent from "./loading/AnalyzingComponent";
import { getItemInfoWithoutLogin } from "../api/getItemInfoWithoutLogin";
const FITTING_URL = process.env.REACT_APP_TEMP_FITTING_URL;
const LandingPage = ({ onLoginSuccess }) => {
  const [animatedText, setAnimatedText] = useState(["", ""]);
  const [url, setUrl] = useState("");
  const [itemInfoData, setItemInfoData] = useState(null);
  const { showPopup, hidePopup } = usePopup();
  const navigate = useNavigate();

  const handleButtonClick = (referer) => {
    track(`ClickOpenChating_${referer}`);
    ReactGA.event({
      category: "Join open chating",
      action: `Clicked ${referer} button`,
      label: `Landing`,
    });
  };

  const handleAIButtonClick = () => {
    track(`Clicked_AIFitting`);
    ReactGA.event({
      category: "Clicked_AIFitting",
      action: `Clicked Clicked_AIFitting button`,
      label: `Landing`,
    });
  };

  useEffect(() => {
    const textSequence = [
      ["", ""],
      ["늘", ""],
      ["늘의", ""],
      ["늘의", "밈"],
      ["늘의", "밈"],
      ["늘의", ""],
      ["늘", ""],
      ["", ""],
      ["리", ""],
      ["리와", ""],
      ["리와 쭈", ""],
      ["리와 쭈", "미"],
      ["리와 쭈", "미"],
      ["리와 쭈", ""],
      ["리와", ""],
      ["리", ""],
      ["", ""],
      ["늘", ""],
      ["늘의", ""],
      ["늘의", "밈"],
      ["늘의", "밈"],
      ["늘의", ""],
      ["늘", ""],
      ["", ""],
      ["징", ""],
      ["징어", ""],
      ["징어", "미"],
      ["징어", "미기"],
      ["징어", "미기"],
      ["징어", "미"],
      ["징어", ""],
      ["징", ""],
      ["", ""],
    ];

    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % textSequence.length;
      setAnimatedText(textSequence[index]);
    }, 200); // 1초마다 변경

    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      // LocalStorage에서 okkuId를 확인하고, 없으면 생성
      let okkuId = localStorage.getItem("okkuId");
      if (!okkuId) {
        okkuId = uuidv4();
        localStorage.setItem("okkuId", okkuId);
      }
      const fetchedPick = await getItemInfoWithoutLogin(url, okkuId);
      setItemInfoData(fetchedPick);
      hidePopup();
    } catch (err) {
      if (
        err.response &&
        err.response.data.message == "must login" &&
        err.response.status == 402
      ) {
        showPopup(
          "error",
          <LoginPopup
            title="비회원 분석 횟수를 모두 소진하였습니다."
            message="지금 로그인하며 모든 기능이 공짜!"
            onClick={onLoginSuccess}
          />
        );
      } else if (
        err.response &&
        err.response.data.message == "domain invalid" &&
        err.response.status == 400
      ) {
        showPopup(
          "error",
          <ErrorPopup
            title="지원하지 않는 쇼핑몰입니다."
            message="개발자에서 쇼핑몰 지원을 문의하면 반영해드립니다!"
            onClick={() => {
              window.location.href = "https://okku.kr";
            }}
          />
        );
      } else {
        showPopup(
          "error",
          <ErrorPopup
            title="지원하지 않는 쇼핑몰입니다."
            message="개발자에서 쇼핑몰 지원을 문의하면 반영해드립니다!"
            onClick={() => {
              hidePopup();
            }}
          />
        );
      }
    }
  };

  const handleAnalyze = async () => {
    track("Use_withoutLogin");
    ReactGA.event({
      category: "Use",
      action: `Clicked Analyze button`,
      label: `Landing`,
    });
    const urlPattern = /^https?:\/\//;

    if (!urlPattern.test(url)) {
      showPopup(
        "error",
        <ErrorPopup
          title="잘못된 형태의 url입니다."
          message="버그라면 개발자에게 제보하세요!"
          onClick={() => {
            hidePopup();
          }}
        />
      );
    } else {
      showPopup("central", <AnalyzingComponent />);
      await fetchData();
    }
  };

  const handleInputChange = (event) => {
    setUrl(event.target.value);
  };
  return (
    <>
      {itemInfoData ? (
        <div>
          <PickPageWithoutLogin
            data={itemInfoData}
            setData={setItemInfoData}
            onLoginSuccess={onLoginSuccess}
          />
        </div>
      ) : (
        <div className="app-container">
          {/* 상단 텍스트 */}
          <div className="header-text">
            옷 구매는 오꾸
            <img src={"assets/beta.png"} alt="Logo" className="header-image" />
          </div>

          {/* 로고와 타이틀 */}
          <div className="logo-title-center">
            <div className="logo-title-container">
              <img src="assets/logo.png" alt="로고" className="logo-image" />
              <div className="title-text">
                <p>
                  <span className="highlight">오</span>
                  <span>{animatedText[0]}</span>
                </p>
                <p>
                  <span className="highlight">꾸</span>
                  <span>{animatedText[1]}</span>
                </p>
              </div>
            </div>
          </div>
          {/* 쇼핑몰 로고 스크롤 */}

          {/* URL 입력 및 분석 버튼 */}
          <div className="url-input-container">
            <input
              type="text"
              placeholder="URL을 입력하세요"
              className="url-input"
              onChange={handleInputChange}
            />
            <button className="analyze-button" onClick={handleAnalyze}>
              리뷰 보기
            </button>
          </div>
          <div style={{ color: "#888" }}>
            베타 버전은 musinsa, zigzag, ably만 지원합니다.
          </div>
          <div className="login-button">
            <KakaoLoginButton onLoginSuccess={onLoginSuccess} />
          </div>
          <div className="new-component">
            <img
              src="assets/aiFitting.png"
              alt="설명 이미지"
              className="image-left"
            />
            <div className="text-and-button-right">
              <p>AI 가상 피팅 기능이 베타 출시했습니다!</p>
              <p>베타 기간동안 무료로 기능을 제공합니다</p>
              <a
                href={FITTING_URL}
                className="fitting-button"
                onClick={() => handleAIButtonClick}
              >
                <img src="assets/dress.png" />
                AI 가상 피팅하기
              </a>
            </div>
          </div>
          <div className="partners-container">
            <div className="scrolling-logos">
              <img src="assets/musinsa.png" alt="무신사" />
              <img src="assets/ably.png" alt="에이블리" />
              <img src="assets/zigzag.png" alt="지그재그" />
              {/* 추가 로고 이미지들 */}
            </div>
          </div>
          <div className="join-kakaotalk-button">
            <a
              href="https://open.kakao.com/o/g3EpAvFg"
              className="develop-button"
              onClick={() => handleButtonClick("Join develop")}
            >
              <img src="assets/develop.png" />
              개발자에게 조언하기
            </a>
            <a
              href="https://open.kakao.com/o/g3EpAvFg"
              className="bug-button"
              onClick={() => handleButtonClick("Report bug")}
            >
              <img src="assets/bug.png" />
              버그 제보하기
            </a>
          </div>
          <div className="join-kakaotalk-button">
            <a
              href="https://open.kakao.com/o/g3EpAvFg"
              className="shopping-button"
              onClick={() => handleButtonClick("Request adding shopingmol")}
            >
              <img src="assets/shopping.png" />
              쇼핑몰 추가해달라고 하기
            </a>
          </div>
          {/* 서비스 소개 섹션 */}
          <div className="service-intro">
            <img
              src="assets/description.png"
              alt="서비스 1"
              className="intro-image"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default LandingPage;
