// src/hooks/useFetchPicks.js
import { useState, useEffect } from "react";
import { getPicks } from "../api/getPicks";

const useGetPicks = (setPickData, cartId = null, page = 0, size = 30) => {
  const [getPickData, setGetPickData] = useState([]);
  const [getPickLoading, setLoading] = useState(true);
  const [getPickError, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPicks(cartId, page, size);
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
