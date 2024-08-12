import React from "react";
import ReactGA from "react-ga";

const Footer = () => {
  const handleButtonClick = (platform) => {
    ReactGA.event({
      category: "Social Media",
      action: `Clicked ${platform} button`,
      label: `Footer ${platform}`,
    });
  };

  return (
    <footer
      style={{
        backgroundColor: "#f1f1f1",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <p style={{ margin: 0 }}>&copy; 2024 Okku. All rights reserved.</p>
      <div style={{ display: "flex", gap: "10px" }}>
        <a
          href="https://open.kakao.com/o/g3EpAvFg"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleButtonClick("KakaoTalk")}
          style={{
            display: "inline-block",
            width: "24px",
            height: "24px",
            background:
              "url('assets/kakao-button.png') no-repeat center/contain",
          }}
          aria-label="KakaoTalk"
        ></a>
        <a
          href="https://www.instagram.com/okku.official"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleButtonClick("Instagram")}
          style={{
            display: "inline-block",
            width: "24px",
            height: "24px",
            background:
              "url('assets/instagram-button.png') no-repeat center/contain",
          }}
          aria-label="Instagram"
        ></a>
        <a
          href="https://blog.naver.com/PostList.naver?blogId=okku_official"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleButtonClick("Naver Blog")}
          style={{
            display: "inline-block",
            width: "24px",
            height: "24px",
            background:
              "url('assets/naverblog-button.png') no-repeat center/contain",
          }}
          aria-label="Naver Blog"
        ></a>
      </div>
    </footer>
  );
};

export default Footer;
