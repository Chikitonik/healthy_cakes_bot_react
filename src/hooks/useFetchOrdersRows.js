import { useState, createContext, useEffect } from "react";
import axios from "axios";
import urls from "../data/urls";
import useAuth from "./useAuth";

const useFetchOrdersRows = () => {
  const { auth } = useAuth();
  const [ordersRowsCount, setOrdersRowsCount] = useState();
  const [SQLtableData, setSQLtableData] = useState();
  const [errMsg, setErrMsg] = useState("No data");

  const fetchOrders = async () => {
    try {
      const response = await axios.get(urls.USER_ORDERS_URL + auth.user, {
        headers: { "Content-Type": "application/json" },
        // withCredentials: true,
      });
      // console.log("response?.data >>", JSON.stringify(response?.data));
      if (response?.data && response.data.length > 0) {
        const ordersData = response.data[0].ordersData;
        setSQLtableData(ordersData);
        setOrdersRowsCount(ordersData.length);
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
    fetchOrders();
  }, []);
  // console.log("ordersRowsCount :>> ", ordersRowsCount);
  return [ordersRowsCount, SQLtableData, errMsg];
};

export default useFetchOrdersRows;
