import useFetchSQLtableData from "../hooks/useFetchSQLtableData";
import { ProductItemWeb } from "../components/ProductItem/ProductItemWeb";
import Container from "@mui/material/Container";
import LoadingButton from "@mui/lab/LoadingButton";

export const Store = () => {
  const SQLtable = "cakes";
  const [SQLtableData, errMsg] = useFetchSQLtableData(SQLtable);

  if (SQLtableData) {
    return (
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          backgroundColor: "#DCF9D7",
        }}
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
    // return <div>{errMsg}</div>;
    return (
      <LoadingButton
        loading
        size="large"
        loadingPosition="start"
        sx={{ p: 5, ml: 5 }}
      >
        loading...
      </LoadingButton>
    );
  }
};

export default Store;
