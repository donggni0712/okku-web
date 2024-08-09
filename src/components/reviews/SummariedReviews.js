import React, { useState } from "react";
import "./summariedReviews.css";

const SummariedReviews = ({ reviewsData }) => {
  const [activeTab, setActiveTab] = useState("cons");
  const [expandedReviews, setExpandedReviews] = useState([]); // 배열로 관리

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setExpandedReviews([]); // 탭 변경 시 확장된 리뷰 초기화
  };

  const handleReviewClick = (index) => {
    if (expandedReviews.includes(index)) {
      setExpandedReviews(expandedReviews.filter((i) => i !== index)); // 이미 열려 있으면 닫기
    } else {
      setExpandedReviews([...expandedReviews, index]); // 아니면 열기
    }
  };
  const sortedReviews = reviewsData[activeTab].sort(
    (a, b) => b.count - a.count
  );

  return (
    <div>
      {/* 탭 버튼 */}
      <div className="tab-container">
        <button
          onClick={() => handleTabClick("cons")}
          className={`tab-button ${activeTab === "cons" ? "active" : ""}`}
        >
          주의해야 해요!
        </button>
        <button
          onClick={() => handleTabClick("pros")}
          className={`tab-button ${activeTab === "pros" ? "active" : ""}`}
        >
          이런건 좋아요!
        </button>
      </div>

      {/* 리뷰 목록 */}
      <div className="review-list">
        {sortedReviews.map((review, index) => (
          <div key={index}>
            <div
              className={`review-item ${
                expandedReviews.includes(index) ? "open" : ""
              }`}
              onClick={() => handleReviewClick(index)}
              div
            >
              <span>{review.content}</span>
              <span className="review-count">{review.count}명</span>
            </div>
            {expandedReviews.includes(index) && (
              <div className="review-details">
                {review.comments.map((detail, i) => (
                  <div key={i} className="detail-item">
                    <div className="detail-text">
                      <p className="detail-info">
                        {detail.name ? `${detail.name} / ` : ""}
                        {detail.height ? `${detail.height}cm / ` : ""}
                        {detail.weight ? `${detail.weight}kg` : ""}
                      </p>

                      <p>{detail.comment}</p>
                    </div>
                    {detail.image && (
                      <img
                        src={detail.image}
                        alt="리뷰 이미지"
                        className="review-image"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummariedReviews;
