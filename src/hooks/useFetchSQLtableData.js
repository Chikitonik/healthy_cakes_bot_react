import { useState, useEffect } from "react";
import axios from "axios";
import urls from "../data/urls";

const useFetchSQLtableData = (SQLtable) => {
  const [SQLtableData, setSQLtableData] = useState();
  const [errMsg, setErrMsg] = useState("No data");

  const fetchSQLtableData = async () => {
    try {
      const response = await axios.get(urls.ADMIN_URL + SQLtable, {
        headers: { "Content-Type": "application/json" },
        // withCredentials: true,
      });
      console.log(
        "response?.data[0].SQLtableData >>",
        response?.data[0].SQLtableData
      );
      setSQLtableData(response?.data[0].SQLtableData);
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

export default useFetchSQLtableData;
