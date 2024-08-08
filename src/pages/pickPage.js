import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PickInfo from "../components/pickInfo/PickInfo";
import SummariedReviews from "../components/reviews/SummariedReviews";
import KakaoLoginButton from "../components/login/kakaologinbutton";
import { getPicks } from "../api/getPicks";

const PickPage = ({ isLoggedIn, handleLoginSuccess }) => {
  const { pickId } = useParams();
  const [pick, setPick] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPick = async () => {
      try {
        setLoading(true);
        const data = await getPicks();
        setPick(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (pickId) {
      fetchPick();
    }
  }, [pickId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading pick data.</div>;
  }

  return (
    <div className="App">
      {isLoggedIn ? (
        <div className="reviews-container">
          {pick ? <PickInfo pick={pick} /> : <div>Pick not found.</div>}
          <SummariedReviews pickId={pickId} />
        </div>
      ) : (
        <KakaoLoginButton onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default PickPage;
