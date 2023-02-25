import React from "react";
import Container from "@mui/material/Container";
import axios from "axios";
import urls from "../data/urls";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";

const Cart = () => {
  const { auth } = useAuth();
  const [SQLtableData, setSQLtableData] = useState();
  const [errMsg, setErrMsg] = useState("No data");
  const fetchCart = async () => {
    try {
      const response = await axios.get(urls.USER_CART_URL + auth.user, {
        headers: { "Content-Type": "application/json" },
        // withCredentials: true,
      });
      console.log("response?.data >>", JSON.stringify(response?.data));
      setSQLtableData(response?.data[0].cartData);
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
  {
    if (SQLtableData) {
      return (
        <Container
          sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {SQLtableData.map((item) => (
            <div>{JSON.stringify(item)}</div>
          ))}
        </Container>
      );
    } else {
      return <div>{errMsg}</div>;
    }
  }
};
export default Cart;
