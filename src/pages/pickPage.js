import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PickInfo from "../components/pickInfo/PickInfo";
import SummariedReviews from "../components/reviews/SummariedReviews";
import KakaoLoginButton from "../components/login/kakaologinbutton";
import { getPicks } from "../api/getPicks";
import { getReviewsWithoutLogin } from "../api/getReviewsWithoutLogin";

const PickPage = ({ isLoggedIn, handleLoginSuccess }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPick = await getReviewsWithoutLogin("url");
        setData(fetchedPick);
      } catch (err) {
        setError(err.message || "Error fetching pick");
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchData(); // 데이터 가져오기
  });

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
  }

  if (error) {
    return <div>Error: {error}</div>; // 에러 발생 시 표시할 내용
  }

  return (
    <div className="App">
      {isLoggedIn ? (
        <div className="reviews-container">
          {data ? <PickInfo pick={data.pick} /> : <div>Pick not found.</div>}
          <SummariedReviews reviewsData={data.reviews} />
        </div>
      ) : (
        <KakaoLoginButton onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default PickPage;
