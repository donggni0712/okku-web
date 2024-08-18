import React, { useState, useEffect } from "react";
import "./summariedReviews.css";
import { getReviewsWithoutLogin } from "../../api/getReviewsWithoutLogin";
import AnalyzingComponent from "../loading/AnalyzingComponent";
import ErrorPage from "../../pages/errorPage";
import LoginPopup from "../popup/LoginPopup";
import ErrorPopup from "../popup/ErrorPopup";

const SummariedReviews = ({ productPk, platform, reviews, onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState("cons");
  const [expandedReviews, setExpandedReviews] = useState([]); // 배열로 관리
  const [reviewsData, setReviewsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

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
          );
          setReviewsData(reviewData.reviews);
        }
      } catch (error) {
        setErr(error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setExpandedReviews([]);
  };

  const handleReviewClick = (index) => {
    if (expandedReviews.includes(index)) {
      setExpandedReviews(expandedReviews.filter((i) => i !== index));
    } else {
      setExpandedReviews([...expandedReviews, index]);
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
    if (
      err.response.data.message == "must login" &&
      err.response.status == 500
    ) {
      return (
        <LoginPopup
          title="비회원 분석 횟수를 모두 소진하였습니다."
          message="지금 로그인하며 모든 기능이 공짜!"
          onClick={onLoginSuccess}
        />
      );
    } else if (
      err.response.data.message == "domain invalid" &&
      err.response.status == 400
    ) {
    } else {
      return (
        <ErrorPopup
          title="지원하지 않는 쇼핑몰입니다."
          message="개발자에서 쇼핑몰 지원을 문의하면 반영해드립니다!"
          onClick={() => {
            window.location.href = "https://okku.kr";
          }}
        />
      );
    }
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
    <div className="reviews-wrapper">
      {/* 탭 버튼 */}
      <div className="tab-container">
        <button
          onClick={() => handleTabClick("cons")}
          className={`tab-button ${activeTab === "cons" ? "active" : ""}`}
        >
          ⚠️ 주의해야 해요!
        </button>
        <button
          onClick={() => handleTabClick("pros")}
          className={`tab-button ${activeTab === "pros" ? "active" : ""}`}
        >
          👍 이런건 좋아요!
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
