import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PickInfo from "../components/pickInfo/PickInfo";
import SummariedReviews from "../components/reviews/SummariedReviews";
import KakaoLoginButton from "../components/login/kakaologinbutton";
import { getPicks } from "../api/getPicks";

const PickPageWithoutLogin = ({ isLoggedIn, handleLoginSuccess }) => {
  const { pickId } = useParams();
  // const [pick, setPick] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchPick = async () => {
  //     try {
  //       setLoading(true);
  //       const data = await getPicks();
  //       setPick(data);
  //     } catch (err) {
  //       setError(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (pickId) {
  //     fetchPick();
  //   }
  // }, [pickId]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error loading pick data.</div>;
  // }
  const pick = {
    image:
      "https://d3ha2047wt6x28.cloudfront.net/wfDbYoyS7LA/pr:GOODS_DETAIL/czM6Ly9hYmx5LWltYWdlLWxlZ2FjeS9kYXRhL2dvb2RzLzIwMjQwODAxXzE3MjI0NzYzNTI3MTAzMjhtLmpwZw",
    name: "무센트 슬로건 반팔 티 커플룩 시밀러룩 커플티 (크롭, 루즈핏)",
    price: 29900,
  };

  return (
    <div className="App">
      <div className="reviews-container">
        {pick ? <PickInfo pick={pick} /> : <div>Pick not found.</div>}
        <SummariedReviews pickId={pickId} />
      </div>
    </div>
  );
};

export default PickPageWithoutLogin;
