import React, { useContext, useEffect, useState } from "react";
import { Context } from "../components/Provider/Provider";
import useFetchCartRows from "../hooks/useFetchCartRows";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import useFetchSQLtableData from "../hooks/useFetchSQLtableData";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import useFetchSQLUserAddress from "../hooks/useFetchSQLUserAddress";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Link } from "react-router-dom";
import axios from "axios";
import urls from "../data/urls";
import Box from "@mui/material/Box";

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
    SQLtableDataCartRows.forEach((element) => {
      const url = SQLtableData.filter(
        (value) => value.id === element.cake_id
      )[0].image_source;
      element.image_source = url;
    });
  }

  const columns = [
    { field: "title", headerName: "Title", width: 250 },
    {
      field: "price_with_discount",
      headerName: "Price",
      width: 100,
    },
    { field: "amount", headerName: "Amount", width: 100 },
    {
      field: "image_source",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value}
          alt={`Cake ${params.row.title}`}
          style={{
            //  width: "100%",
            height: "100%",
          }}
        />
      ),
    },
  ];

  const [selectionModel, setSelectionModel] = React.useState([]);
  const [totalSum, setTotalSum] = React.useState(0);
  const [positionsData, setPositionData] = React.useState([]);
  const handleSelectionModelChange = (newSelectionModel) => {
    setSelectionModel(newSelectionModel);
    setTotalSum(
      newSelectionModel.reduce((acc, id) => {
        acc += +SQLtableDataCartRows.filter((row) => row.id === id)[0]
          .price_with_discount;
        return parseInt(acc * 100) / 100;
      }, 0)
    );
    const dataSelectedRows = newSelectionModel.reduce((acc, id) => {
      acc.push(SQLtableDataCartRows.filter((row) => row.id === id));
      return acc;
    }, []);
    console.log("dataSelectedRows :>> ", dataSelectedRows);

    setPositionData(
      dataSelectedRows
        .flat()
        .map(
          ({ cake_id, price_with_discount, amount }) =>
            `('order_id', ${cake_id}, ${price_with_discount}, ${amount})`
        )
        .join(", ")
    );
  };

  const [SQLtableAddress, errMsgAddress] = useFetchSQLUserAddress();

  const [valueAddress, setValueAddress] = useState(
    SQLtableAddress && SQLtableAddress.length > 0
      ? SQLtableAddress[0].address
      : ""
  );
  const [valueAddressId, setValueAddressId] = useState(
    SQLtableAddress && SQLtableAddress.length > 0 ? SQLtableAddress[0].id : ""
  );

  useEffect(() => {
    if (SQLtableAddress && SQLtableAddress.length > 0) {
      setValueAddress(SQLtableAddress[0].address);
      setValueAddressId(SQLtableAddress[0].id);
    }
  }, [SQLtableAddress]);

  const handleChange = (event) => {
    setValueAddress(event.target.value);
    setValueAddressId(event.target.id);
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.put(
        urls.USER_CART_URL +
          "create_order/" +
          `${SQLtableAddress[0].username}/${valueAddressId}/${totalSum}/${positionsData}/${selectionModel}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (err) {
      console.log("err :>> ", err);
      if (!err?.response) {
      }
    }
    location.reload();
  };

  return (
    <Box
      sx={{
        p: 3,
        // background: "#DCF9D7",
        // minHeight: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 2,
          // height: 800,
          // width: "80vw",
        }}
      >
        {SQLtableAddress && SQLtableAddress.length > 0 ? (
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Address
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              // defaultValue="female"
              value={valueAddress}
              name="controlled-radio-buttons-group"
              onChange={handleChange}
            >
              {SQLtableAddress.map((element) => {
                return (
                  <FormControlLabel
                    key={element.id}
                    id={element.id.toString()}
                    value={element.address}
                    label={element.address}
                    control={<Radio id={element.id.toString()} />}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        ) : (
          <></>
        )}
        <Button variant="contained" sx={{ m: 1 }}>
          <Link to="/settings">go to setting to add a new address</Link>
        </Button>

        {SQLtableDataCartRows ? (
          <DataGrid
            autoHeight={true}
            rows={SQLtableDataCartRows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0
                ? "Mui-even"
                : "Mui-odd"
            }
            checkboxSelection
            selectionModel={selectionModel}
            onSelectionModelChange={handleSelectionModelChange}
          />
        ) : (
          "cart is empty"
        )}
        <Button
          variant="contained"
          onClick={handlePlaceOrder}
          disabled={(true && !totalSum > 0) || valueAddress === ""}
          sx={{ m: 1 }}
        >
          Place your order for &nbsp;<b>{totalSum} $</b>
        </Button>
      </Paper>
    </Box>
  );
};
export default Cart;
