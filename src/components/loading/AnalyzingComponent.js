import React, { useState, useEffect } from "react";
import "./loadingComponent.css"; // 스타일 파일을 별도로 작성합니다.

const AnalyzingComponent = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : ""));
    }, 500); // 500ms 간격으로 점이 추가되거나 사라집니다.

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      <img src="assets/loading.gif" alt="Loading GIF" className="loading-gif" />
      <div className="loading-text">분석중{dots}</div>
      <div className="message">1분가량 시간이 소모될 수 있습니다.</div>
    </div>
  );
};

export default AnalyzingComponent;
