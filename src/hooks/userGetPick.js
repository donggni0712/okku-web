// src/hooks/useFetchPicks.js
import { useState, useEffect } from "react";
import { getPicks } from "../api/getPicks";

const useGetPicks = (page = 1, size = 10) => {
  const [getPickData, setGetPickData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPicks(page, size);
        setGetPickData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, size]);

  return { getPickData, loading, error };
};

export default useGetPicks;
