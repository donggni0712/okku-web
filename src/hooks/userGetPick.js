// src/hooks/useFetchPicks.js
import { useState, useEffect } from "react";
import { getPicks } from "../api/getPicks";

const useGetPicks = (setPickData, cartId = null, page = 1, size = 10) => {
  const [getPickData, setGetPickData] = useState([]);
  const [getPickLoading, setLoading] = useState(true);
  const [getPickError, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPicks(page, size, cartId);
        console.log(data);
        console.log(data.picks);
        setGetPickData(data);
        if (setPickData) {
          setPickData(data);
        }
      } catch (getPickError) {
        setError(getPickError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, size]);

  return { getPickData, getPickLoading, getPickError };
};

export default useGetPicks;
