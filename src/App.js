// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PopupProvider } from "./context/PopupContext";
import Main from "./pages/main";
import CartPage from "./pages/cartPage";
import { setTokens } from "./service/authService";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 카카오 로그인 여부 확인
    if (window.Kakao.Auth.getAccessToken()) {
      setIsLoggedIn(true);
      setTokens(
        window.Kakao.Auth.getAccessToken(),
        localStorage.getItem("refreshToken")
      );
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLoginSuccess = (tokens) => {
    setIsLoggedIn(true);
    setTokens(tokens.accessToken, tokens.refreshToken);
  };
  return (
    <Router>
      <PopupProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Main
                handleLoginSuccess={handleLoginSuccess}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path="/cart/:cartId"
            element={
              <CartPage
                handleLoginSuccess={handleLoginSuccess}
                isLoggedIn={isLoggedIn}
              />
            }
          />
        </Routes>
      </PopupProvider>
    </Router>
  );
};

export default App;
