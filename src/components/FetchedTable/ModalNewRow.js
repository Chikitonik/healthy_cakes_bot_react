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

export const ModalNewRow = ({ props }) => {
  const { columns, SQLtable, fetchSQLtableData, handleCloseModalNewRow } =
    props;

  const [newRow, setNewRow] = useState();
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
      const response = await axios.put(
        `${urls.ADMIN_URL}update/${SQLtable}/${JSON.stringify(newRow)}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      fetchSQLtableData();
      handleCloseModalNewRow();
    } catch (err) {
      console.log("err :>> ", err);
      setPopoverContent(err.response.data.error);
      setPopoverShow(true);
      if (!err?.response) {
        setErrMsg("No Server Response");
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
        <Typography variant="h6">{SQLtable}</Typography>
      </Box>
      <List>
        {columns.map((column) => (
          <TextField
            key={column.field}
            id={column.field}
            // defaultValue={value[1]}
            label={column.field}
            fullWidth
            sx={{ m: 1 }}
            disabled={column.field === "id"}
            onChange={updateValue}
          />
        ))}
      </List>
      <Button variant="contained" sx={{ width: "100%" }} onClick={handleNewRow}>
        create new row
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
