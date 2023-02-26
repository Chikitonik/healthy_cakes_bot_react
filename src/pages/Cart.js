import React from "react";
import Container from "@mui/material/Container";
import { useContext, useEffect } from "react";
import { Context } from "../components/Provider/Provider";
import useFetchCartRows from "../hooks/useFetchCartRows";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import useFetchSQLtableData from "../hooks/useFetchSQLtableData";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const Cart = () => {
  const {
    SQLtableDataCartRows,
    setSQLtableDataCartRows,
    cartRowsCount,
    setCartRowsCount,
  } = useContext(Context);
  const [fetchedCartRowsCount, fetchedSQLtableData, errMsg] =
    useFetchCartRows();

  useEffect(() => {
    if (fetchedCartRowsCount !== undefined) {
      setSQLtableDataCartRows(fetchedSQLtableData);
      setCartRowsCount(fetchedCartRowsCount);
    }
  }, [fetchedCartRowsCount]);

  const SQLtable = "cakes";
  const [SQLtableData, errMsgFetchSQLTable] = useFetchSQLtableData(SQLtable);
  if (SQLtableData && SQLtableDataCartRows) {
    SQLtableDataCartRows.forEach((element) => {
      element.title = SQLtableData.filter(
        (value) => value.id === element.cake_id
      )[0].title;
    });
  }

  const columns = [
    { field: "id", headerName: "id", width: 70 },
    { field: "title", headerName: "title", width: 250 },
    {
      field: "price_with_discount",
      headerName: "price",
      width: 100,
    },
    { field: "amount", headerName: "amount", width: 100 },
  ];

  const [selectionModel, setSelectionModel] = React.useState([]);
  const [totalSum, setTotalSum] = React.useState(0);
  const handleSelectionModelChange = (newSelectionModel) => {
    setSelectionModel(newSelectionModel);
    setTotalSum(
      newSelectionModel.reduce((acc, id) => {
        acc += +SQLtableDataCartRows.filter((row) => row.id === id)[0]
          .price_with_discount;
        return parseInt(acc * 100) / 100;
      }, 0)
    );
  };

  return (
    <Paper
      elevation={3}
      sx={
        {
          // height: 800,
          // width: "80vw",
        }
      }
    >
      <p>Selected rows: {selectionModel.join(", ")}</p>
      <Button
        variant="contained"
        // color="error"
        // value={selectedRow.id}
        // onClick={handleNewRow}
        disabled={true && !totalSum > 0}
        sx={{ m: 1 }}
      >
        Place your order for {totalSum} $
      </Button>
      <DataGrid
        autoHeight={true}
        rows={SQLtableDataCartRows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "Mui-even" : "Mui-odd"
        }
        checkboxSelection
        selectionModel={selectionModel}
        onSelectionModelChange={handleSelectionModelChange}
      />
    </Paper>
  );

  {
    if (SQLtableDataCartRows) {
      return (
        <Container
          sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {SQLtableDataCartRows.map((item) => (
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
