// src/hooks/useFetchCarts.js
import { useState, useEffect } from "react";
import { getCarts } from "../api/getCarts";

const useGetCarts = (page = 1, size = 10) => {
  const [getCartData, setGetCartData] = useState([]);
  const [getCartLoading, setLoading] = useState(true);
  const [getCartError, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCarts(page, size);
        setGetCartData(data);
      } catch (getCartError) {
        setError(getCartError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, size]);

  return { getCartData, getCartLoading, getCartError };
};

export default useGetCarts;
