import { useState, useEffect } from "react";
import axios from "axios";
import urls from "../data/urls";

const useFetchSQLUserData = (SQLtable) => {
  const [SQLtableData, setSQLtableData] = useState();
  const [errMsg, setErrMsg] = useState("No data");
  const username = JSON.parse(localStorage.getItem("CakeStore")).user;

  const fetchSQLtableData = async () => {
    try {
      const response = await axios.get(urls.USER_SETTINGS + username, {
        headers: { "Content-Type": "application/json" },
        // withCredentials: true,
      });
      console.log(
        "response?.data[0].SQLtableData >>",
        response?.data[0].userData
      );
      setSQLtableData(response?.data[0].userData);
    } catch (err) {
      console.log("err :>> ", err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      }
    }
  };
  useEffect(() => {
    fetchSQLtableData();
  }, []);

  return [SQLtableData, errMsg];
};

export default useFetchSQLUserData;
