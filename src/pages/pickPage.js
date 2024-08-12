import React, { useState, useEffect } from "react";
import PickInfo from "../components/pickInfo/PickInfo";
import SummariedReviews from "../components/reviews/SummariedReviews";
import KakaoLoginButton from "../components/login/kakaologinbutton";
import { getReviewsWithoutLogin } from "../api/getReviewsWithoutLogin";
import { useNavigate, useParams } from "react-router-dom";
import { getReviews } from "../api/getReviews";
import ErrorPage from "./errorPage";
import LoadingComponent from "../components/loading/LoadingComponent";

const PickPage = ({ isLoggedIn, handleLoginSuccess }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const navigate = useNavigate();
  const { pickId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPick = await getReviews(pickId);
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
    return <LoadingComponent />; // 로딩 중일 때 표시할 내용
  }

  if (error) {
    return <ErrorPage />; // 에러 발생 시 표시할 내용
  }

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <div className="reviews-container">
          <div className="pick-header">
            <button className="back-button" onClick={handleBack}>
              &lt;
            </button>
          </div>
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
