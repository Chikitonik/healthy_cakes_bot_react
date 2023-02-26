import useFetchSQLtableData from "../hooks/useFetchSQLtableData";
import { ProductItemWeb } from "../components/ProductItem/ProductItemWeb";
import Container from "@mui/material/Container";
import { Context } from "../components/Provider/Provider";
import { useState, useContext, useEffect } from "react";

export const Store = () => {
  const SQLtable = "cakes";
  const [SQLtableData, errMsg] = useFetchSQLtableData(SQLtable);

  if (SQLtableData) {
    return (
      <Container
        sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
      >
        {SQLtableData.map((item) => (
          <ProductItemWeb
            product={item}
            key={item.id}
            //   onAdd={onAdd}
            //   onShowDescription={onShowDescription}
            //   className={"item"}
          />
        ))}
      </Container>
    );
  } else {
    return <div>{errMsg}</div>;
  }
};

export default Store;
