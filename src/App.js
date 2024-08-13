import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PopupProvider } from "./context/PopupContext";
import Main from "./pages/main";
import CartPage from "./pages/cartPage";
import { setTokens } from "./service/authService";
import Notification from "./components/popup/Notification";
import PickPage from "./pages/pickPage";
import Footer from "./components/footer/FooterComponent"; // Footer import
import "./App.css"; // 스타일링을 위한 CSS 파일 import
import RouteChangeTracker from "./RouteChangeTraker";
import { Analytics } from "@vercel/analytics/react";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notification, setNotification] = useState(null);
  const params = new URLSearchParams(window.location.search);
  const recomend = params.get("recomend");
  if (recomend) {
    localStorage.setItem("recomend", recomend);
  }

  useEffect(() => {
    if (
      window.Kakao.Auth &&
      window.Kakao.Auth.getAccessToken() &&
      localStorage.getItem("refreshToken")
    ) {
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
      <RouteChangeTracker />
      <Analytics />
      <PopupProvider>
        <div className="App-wrap">
          <div className="content-wrap">
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    handleLoginSuccess={handleLoginSuccess}
                    isLoggedIn={isLoggedIn}
                    notification={notification}
                    setNotification={setNotification}
                  />
                }
              />
              <Route
                path="/cart/:cartId"
                element={
                  <CartPage
                    handleLoginSuccess={handleLoginSuccess}
                    isLoggedIn={isLoggedIn}
                    notification={notification}
                    setNotification={setNotification}
                  />
                }
              />
              <Route
                path="/pick/:pickId"
                element={
                  <PickPage
                    handleLoginSuccess={handleLoginSuccess}
                    isLoggedIn={isLoggedIn}
                    notification={notification}
                    setNotification={setNotification}
                  />
                }
              />
            </Routes>
          </div>
          {notification && (
            <Notification
              message={notification}
              onClose={() => setNotification(null)}
            />
          )}
          <Footer />
        </div>
      </PopupProvider>
    </Router>
  );
};

export default App;
