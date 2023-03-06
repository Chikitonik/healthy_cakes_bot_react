import { useState } from "react";
import axios from "axios";
import urls from "../../data/urls";
import {
  Paper,
  Button,
  Box,
  Typography,
  List,
  TextField,
  Popover,
} from "@mui/material";

export const ModalNewAddress = ({ props }) => {
  const username = JSON.parse(localStorage.getItem("CakeStore")).user;

  const {
    // columns,
    // SQLtable,
    fetchSQLtableData,
    handleCloseModalNewAddress,
  } = props;

  const [newRow, setNewRow] = useState({ username: username });
  const [popoverShow, setPopoverShow] = useState(false);
  const [popoverContent, setPopoverContent] = useState(false);

  const handleClosePopover = () => {
    setPopoverShow(false);
  };

  const updateValue = (e) => {
    setNewRow({
      ...newRow,
      [e.target.id]: e.target.value.replaceAll("/", "%2F"),
    });
  };

  const handleNewRow = async () => {
    try {
      console.log("newRow :>> ", newRow);
      const response = await axios.put(
        `${urls.USER_SETTINGS}update/customer_address/${JSON.stringify(
          newRow
        )}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      fetchSQLtableData();
      handleCloseModalNewAddress();
    } catch (err) {
      try {
        console.log("err :>> ", err);
        setPopoverContent(err.response.data.error);
        setPopoverShow(true);
        if (!err?.response) {
          setErrMsg("No Server Response");
        }
      } catch {
        console.log("err :>> ", err);
      }
    }
  };

  return (
    <Paper
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">Adding a new address</Typography>
      </Box>
      {/* <List> */}
      {/* {columns.map((column) => ( */}
      <TextField
        key="address"
        id="address"
        // defaultValue={value[1]}
        label="address"
        fullWidth
        sx={{ m: 1 }}
        onChange={updateValue}
      />
      {/* ))} */}
      {/* </List> */}
      <Button variant="contained" sx={{ width: "100%" }} onClick={handleNewRow}>
        create
      </Button>
      <Popover
        open={popoverShow}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>
          Error: {JSON.stringify(popoverContent)}
        </Typography>
      </Popover>
    </Paper>
  );
};
