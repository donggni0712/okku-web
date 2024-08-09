import React, { useState, useEffect } from "react";
import PickInfo from "../components/pickInfo/PickInfo";
import SummariedReviews from "../components/reviews/SummariedReviews";
import KakaoLoginButton from "../components/login/kakaologinbutton";
import "./withoutLogin.css";

const PickPageWithoutLogin = ({ data, onLoginSuccess, setData }) => {
  const handleBack = () => {
    setData(null);
  };
  return (
    <div className="App">
      <div className="reviews-container">
        <div className="pick-header">
          <button className="back-button" onClick={handleBack}>
            &lt;
          </button>
        </div>
        {data ? <PickInfo pick={data.pick} /> : <div>Pick not found.</div>}
        <SummariedReviews reviewsData={data.reviews} />
      </div>
    </div>
  );
};

export default PickPageWithoutLogin;
