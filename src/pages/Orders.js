import React, { useContext, useEffect, useState } from "react";
import { Context } from "../components/Provider/Provider";
import useFetchOrdersRows from "../hooks/useFetchOrdersRows";
import Paper from "@mui/material/Paper";
import axios from "axios";
import urls from "../data/urls";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Orders = () => {
  const {
    SQLtableDataOrdersRows,
    setSQLtableDataOrdersRows,
    ordersRowsCount,
    setOrdersRowsCount,
  } = useContext(Context);
  const [fetchedOrdersRowsCount, fetchedSQLtableData, errMsg] =
    useFetchOrdersRows();

  useEffect(() => {
    if (fetchedOrdersRowsCount !== undefined) {
      setSQLtableDataOrdersRows(fetchedSQLtableData);
      setOrdersRowsCount(fetchedOrdersRowsCount);
    }
  }, [fetchedOrdersRowsCount]);

  //#region orders_position
  const [positionsData, setPositionData] = useState([]);

  const fetchOrdersPosition = async () => {
    const ids = SQLtableDataOrdersRows.map((item) => item.id);
    try {
      const response = await axios.get(
        urls.USER_ORDERS_POSITION_URL + ids.join(","),
        {
          headers: { "Content-Type": "application/json" },
          // withCredentials: true,
        }
      );
      // console.log("response?.data >>", JSON.stringify(response?.data));
      if (response?.data && response.data.length > 0) {
        const ordersPositionData = response.data[0].ordersData;
        setPositionData(ordersPositionData);
      } else {
        // setErrMsg("No data");
      }
    } catch (err) {
      console.log("err :>> ", err);
      if (!err?.response) {
        // setErrMsg("No Server Response");
      }
    }
  };
  useEffect(() => {
    fetchOrdersPosition();
  }, SQLtableDataOrdersRows);

  //#endregion orders_position

  //#region table
  function createData(OrderHeaderRow) {
    const items = positionsData.filter(
      (item) => item.order_id === OrderHeaderRow.id
    );
    // console.log("items :>> ", items);
    return {
      id: OrderHeaderRow.id,
      address: OrderHeaderRow.address,
      sum: OrderHeaderRow.sum,
      is_delivered: OrderHeaderRow.is_delivered,
      items: items,
    };
  }

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      // <div key={row.id}>
      <React.Fragment key={row.id}>
        <TableRow>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>{row.id}</TableCell>
          <TableCell>{row.address}</TableCell>
          <TableCell>{row.sum}</TableCell>
          <TableCell>{row.is_delivered}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography>Items</Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>cake title</TableCell>
                      <TableCell>price</TableCell>
                      <TableCell>amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.items.map((itemsRow) => (
                      <TableRow key={itemsRow.date}>
                        <TableCell>{itemsRow.title}</TableCell>
                        <TableCell>{itemsRow.price_with_discount}</TableCell>
                        <TableCell>{itemsRow.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
        {/* </div> */}
      </React.Fragment>
    );
  }

  const rows = SQLtableDataOrdersRows?.map((row) => createData(row));
  // console.log("SQLtableDataOrdersRows :>> ", SQLtableDataOrdersRows);
  // console.log("positionsData :>> ", positionsData);
  //#endregion table

  return (
    <Box
      sx={{
        p: 3,
        background: "#eeeeee",
        height: "90vh",
      }}
    >
      <Paper elevation={3}>
        {SQLtableDataOrdersRows ? (
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  {/* <TableCell>Dessert (100g serving)</TableCell> */}
                  <TableCell>Order number</TableCell>
                  <TableCell>address_id</TableCell>
                  <TableCell>sum</TableCell>
                  <TableCell>is_delivered</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <Row key={row.name} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          "orders is empty"
        )}
      </Paper>
    </Box>
  );
};
export default Orders;
