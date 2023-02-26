import { useState, createContext, useEffect } from "react";
import axios from "axios";
import urls from "../data/urls";
import useAuth from "./useAuth";

const useFetchCartRows = () => {
  const { auth } = useAuth();
  const [cartRowsCount, setCartRowsCount] = useState();
  const [SQLtableData, setSQLtableData] = useState();
  const [errMsg, setErrMsg] = useState("No data");

  const fetchCart = async () => {
    try {
      const response = await axios.get(urls.USER_CART_URL + auth.user, {
        headers: { "Content-Type": "application/json" },
        // withCredentials: true,
      });
      // console.log("response?.data >>", JSON.stringify(response?.data));
      if (response?.data && response.data.length > 0) {
        const cartData = response.data[0].cartData;
        setSQLtableData(cartData);
        setCartRowsCount(cartData.length);
      } else {
        setErrMsg("No data");
      }
    } catch (err) {
      console.log("err :>> ", err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      }
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);

  return [cartRowsCount, SQLtableData, errMsg];
};

export default useFetchCartRows;
