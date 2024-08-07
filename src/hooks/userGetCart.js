import { useState, useEffect } from "react";
import { getCarts } from "../api/getCarts";

const useGetCarts = (setCartData, page = 1, size = 30) => {
  const [getCartData, setGetCartData] = useState([]);
  const [getCartLoading, setLoading] = useState(true);
  const [getCartError, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCarts(page, size);
        setGetCartData(data);
        if (setCartData) {
          setCartData(data); // Assuming `data.carts` is the actual cart data
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, size, setCartData]);

  return { getCartData, getCartLoading, getCartError };
};

export default useGetCarts;
