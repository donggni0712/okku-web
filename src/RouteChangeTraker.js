import { useEffect, useState } from "react";
import ReactGA from "react-ga4";

const RouteChangeTracker = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!window.location.href.includes("localhost")) {
      ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID);
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGA.send(window.location.pathname + window.location.search);
    }
  }, [initialized]);

  return null;
};

export default RouteChangeTracker;
