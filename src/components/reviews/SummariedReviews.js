import React, { useState, useEffect } from "react";
import "./summariedReviews.css";
import { getReviewsWithoutLogin } from "../../api/getReviewsWithoutLogin";
import AnalyzingComponent from "../loading/AnalyzingComponent";
import ErrorPage from "../../pages/errorPage";

const SummariedReviews = ({ productPk, platform, reviews }) => {
  const [activeTab, setActiveTab] = useState("cons");
  const [expandedReviews, setExpandedReviews] = useState([]); // 배열로 관리
  const [reviewsData, setReviewsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (reviews) {
          setReviewsData(reviews);
        } else {
          let okkuId = localStorage.getItem("okkuId");
          const reviewData = await getReviewsWithoutLogin(
            productPk,
            platform,
            okkuId
          ); // 데이터를 가져오는 함수 호출
          setReviewsData(reviewData.reviews);
        }
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      } finally {
        setLoading(false); // 로딩 완료 후 로딩 상태 업데이트
      }
    };

    fetchReviews();
  }, []);

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

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-message">
          <AnalyzingComponent />
        </div>
      </div>
    );
  }

  if (!reviewsData) {
    return (
      <div>
        <ErrorPage />
      </div>
    );
  }

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
