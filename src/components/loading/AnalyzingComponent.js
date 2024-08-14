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
    <div className="analyzing-container">
      <img
        src="https://velog.velcdn.com/images/donggni0712/post/1ecf0581-8d06-4f01-b3c3-242d44cf6b76/image.gif"
        alt="Loading GIF"
        className="loading-gif"
      />
      <div className="loading-text">분석중{dots}</div>
      <div className="message">1분가량 시간이 소모될 수 있습니다.</div>
      <div className="message">문제가 생긴 것 같다면 제보해주세요!</div>
    </div>
  );
};

export default AnalyzingComponent;
