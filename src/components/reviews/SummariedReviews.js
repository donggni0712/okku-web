import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./summariedReviews.css";

const reviewsData = {
  "주의해야 해요!": [
    { content: "옷이 클 수도 있어요!", count: 19 },
    { content: "옷 색이 사진과 달라요!", count: 2 },
    { content: "옷이 작을 수 있어요!", count: 3 },
  ],
  "이런건 좋아요!": [
    { content: "옷이 잘 맞아요!", count: 15 },
    { content: "색상이 예뻐요!", count: 10 },
    { content: "질감이 좋아요!", count: 5 },
  ],
};

const SummariedReviews = ({ pickId }) => {
  const [activeTab, setActiveTab] = useState("주의해야 해요!");
  const navigate = useNavigate();

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleReviewClick = (reviewId) => {
    navigate(`/pick/${pickId}/reviews/${reviewId}`);
  };

  const sortedReviews = reviewsData[activeTab].sort(
    (a, b) => b.count - a.count
  );

  return (
    <div>
      {/* 탭 버튼 */}
      <div className="tab-container">
        <button
          onClick={() => handleTabClick("주의해야 해요!")}
          className={`tab-button ${
            activeTab === "주의해야 해요!" ? "active" : ""
          }`}
        >
          주의해야 해요!
        </button>
        <button
          onClick={() => handleTabClick("이런건 좋아요!")}
          className={`tab-button ${
            activeTab === "이런건 좋아요!" ? "active" : ""
          }`}
        >
          이런건 좋아요!
        </button>
      </div>

      {/* 리뷰 목록 */}
      <div className="review-list">
        {sortedReviews.map((review, index) => (
          <div
            key={index}
            className="review-item"
            onClick={() => handleReviewClick(index + 1)}
          >
            <span>{review.content}</span>
            <span className="review-count">{review.count}명</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummariedReviews;
