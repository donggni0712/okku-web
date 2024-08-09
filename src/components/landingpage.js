import React, { useState, useEffect } from "react";
import "./landingPage.css";
import KakaoLoginButton from "./login/kakaologinbutton";
import { useNavigate } from "react-router-dom";
import { usePopup } from "../context/PopupContext";
import ErrorPopup from "./popup/ErrorPopup";
import { getReviewsWithoutLogin } from "../api/getReviewsWithoutLogin";
import PickPageWithoutLogin from "../pages/pickPageWithoutLogin";

const LandingPage = ({ onLoginSuccess }) => {
  const [animatedText, setAnimatedText] = useState(["", ""]);
  const [url, setUrl] = useState("");
  const [reviewsData, setReviewsData] = useState(null);
  const { showPopup, hidePopup } = usePopup();
  const navigate = useNavigate();
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
      const fetchedPick = await getReviewsWithoutLogin(url);
      setReviewsData(fetchedPick);
    } catch (err) {
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
  };

  const handleAnalyze = async () => {
    const urlPattern = /^https?:\/\//; // http 또는 https로 시작하는지 확인
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
      showPopup("central", <div>분석중...</div>);
      await fetchData();
      hidePopup();
    }
  };
  const handleInputChange = (event) => {
    setUrl(event.target.value);
  };
  return (
    <>
      {reviewsData ? (
        <div>
          <PickPageWithoutLogin data={reviewsData} setData={setReviewsData} />
        </div>
      ) : (
        <div className="app-container">
          {/* 상단 텍스트 */}
          <div className="header-text">옷 구매는 오꾸</div>

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
          <div className="partners-container">
            <div className="scrolling-logos">
              <img src="assets/musinsa.png" alt="무신사" />
              <img src="assets/ably.png" alt="에이블리" />
              <img src="assets/zigzag.png" alt="지그재그" />
              {/* 추가 로고 이미지들 */}
            </div>
          </div>

          {/* URL 입력 및 분석 버튼 */}
          <div className="url-input-container">
            <input
              type="text"
              placeholder="URL을 입력하세요"
              className="url-input"
              onChange={handleInputChange}
            />
            <button className="analyze-button" onClick={handleAnalyze}>
              상품 분석하기!
            </button>
          </div>
          <div className="login-button">
            <KakaoLoginButton onLoginSuccess={onLoginSuccess} />
          </div>
          <div className="login-button">
            <a
              href="https://open.kakao.com/o/g3EpAvFg"
              className="develop-button"
            >
              <img src="assets/develop.png" />
              개발에 간섭하기
            </a>
            <a href="https://open.kakao.com/o/g3EpAvFg" className="bug-button">
              <img src="assets/bug.png" />
              버그 제보하기
            </a>
          </div>
          <div className="login-button">
            <a
              href="https://open.kakao.com/o/g3EpAvFg"
              className="shopping-button"
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
