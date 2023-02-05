import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import urls from "../../data/urls";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import TextField from "@mui/material/TextField";
import Popover from "@mui/material/Popover";
import "./FetchedTable.css";

export const ModalSelectedRow = ({ props }) => {
  const { SQLtable, fetchSQLtableData, handleCloseModalDoubleClick } = props;
  const [selectedRow, setSelectedRow] = React.useState(props.selectedRow);
  const [popoverShow, setPopoverShow] = React.useState(false);
  const [popoverContent, setPopoverContent] = React.useState(false);

  const handleDeleteRow = async (event) => {
    const id = event.target.value;
    if (confirm("⚠️ Are you sure you want to delete this row!?")) {
      try {
        const response = await axios.delete(
          urls.ADMIN_URL + "delete/" + SQLtable + "/" + id,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        fetchSQLtableData();
        handleCloseModalDoubleClick();
      } catch (err) {
        console.log("err :>> ", err);
        if (!err?.response) {
          setErrMsg("No Server Response");
        }
      }
    } else {
      // execute the code for "No"
    }
  };

  const handleUpdateRow = async (event) => {
    console.log("selectedRow :>> ", selectedRow);
    try {
      const response = await axios.put(
        urls.ADMIN_URL +
          "update/" +
          SQLtable +
          "/" +
          JSON.stringify(selectedRow),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      fetchSQLtableData();
      handleCloseModalDoubleClick();
    } catch (err) {
      console.log("err :>> ", err);
      setPopoverContent(err.response.data.error);
      setPopoverShow(true);
      if (!err?.response) {
        setErrMsg("No Server Response");
      }
    }
    // } else {
    // execute the code for "No"
    // }
  };

  const updateValue = (e) => {
    const updatedSelectedRow = {};
    Object.entries(selectedRow).forEach(([key, value]) => {
      if (typeof value === "string") {
        updatedSelectedRow[key] = value.replaceAll("/", "%2F");
      } else {
        updatedSelectedRow[key] = value;
      }
    });

    setSelectedRow({
      ...updatedSelectedRow,
      [e.target.id]: e.target.value.replaceAll("/", "%2F"),
    });
    // console.log("selectedRow :>> ", selectedRow);
  };

  const handleClosePopover = () => {
    setPopoverShow(false);
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
        <Typography variant="h6">{SQLtable}</Typography>
        <Button
          variant="contained"
          color="error"
          value={selectedRow.id}
          onClick={handleDeleteRow}
        >
          delete row
        </Button>
      </Box>
      <List>
        {Object.entries(selectedRow).map(([key, value]) => {
          return (
            <TextField
              key={key}
              id={key}
              defaultValue={value}
              label={key}
              fullWidth
              sx={{ m: 1 }}
              disabled={key === "id"}
              onChange={(e) => updateValue(e)}
            />
          );
        })}
      </List>
      <Button
        variant="contained"
        sx={{ width: "100%" }}
        onClick={handleUpdateRow}
      >
        update
      </Button>
      <Popover
        // id={id}
        // open={open}
        open={popoverShow}
        // anchorEl={anchorEl}
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
