import { useState, useEffect } from "react";
import axios from "axios";
import urls from "../data/urls";

const useFetchSQLUserAddress = (SQLtable) => {
  const [SQLtableAddress, setSQLtableAddress] = useState();
  const [errMsg, setErrMsg] = useState("No data");
  const username = JSON.parse(localStorage.getItem("CakeStore")).user;

  const fetchSQLtableAddress = async () => {
    try {
      const response = await axios.get(
        urls.USER_SETTINGS + "address/" + username,
        {
          headers: { "Content-Type": "application/json" },
          // withCredentials: true,
        }
      );
      console.log(
        "response?.data[0].SQLtableAddress >>",
        response?.data[0].userAddress
      );
      setSQLtableAddress(response?.data[0].userAddress);
    } catch (err) {
      console.log("err :>> ", err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      }
    }
  };
  useEffect(() => {
    fetchSQLtableAddress();
  }, []);

  return [SQLtableAddress, errMsg];
};

export default useFetchSQLUserAddress;
