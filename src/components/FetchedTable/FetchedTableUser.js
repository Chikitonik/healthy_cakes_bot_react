import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import urls from "../../data/urls";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { ModalNewRow } from "./ModalNewRow";
import { ModalSelectedRow } from "./ModalSelectedRow";
import "./FetchedTable.css";

const FetchedTable = (props) => {
  const { SQLtable } = props;
  const [SQLtableData, setSQLtableData] = React.useState();
  const [errMsg, setErrMsg] = React.useState("No data");

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

  const columns = [];
  const rows = [];
  if (SQLtableData && SQLtableData.length > 0) {
    const keys = Object.keys(SQLtableData[0]);
    keys.map((key) => {
      columns.push({ field: key });
    });
  }

  const [openModalDoubleClick, setOpenModalDoubleClick] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(false);
  const handleOpenModalDoubleClick = () => setOpenModalDoubleClick(true);
  const handleCloseModalDoubleClick = () => setOpenModalDoubleClick(false);

  const [openModalNewRow, setOpenModalNewRow] = React.useState(false);
  const handleCloseModalNewRow = () => setOpenModalNewRow(false);

  const handleRowDoubleClick = (params) => {
    setSelectedRow(params.row);
    console.log("selectedRow :>> ", selectedRow);
    handleOpenModalDoubleClick();
  };

  const handleNewRow = () => {
    setOpenModalNewRow(true);
  };

  if (SQLtableData && SQLtableData.length > 0) {
    return (
      <>
        <Paper
          elevation={3}
          sx={{
            // height: 400,
            width: "80vw",
          }}
        >
          <Button
            variant="contained"
            // color="error"
            // value={selectedRow.id}
            onClick={handleNewRow}
            sx={{ m: 1 }}
          >
            new row
          </Button>
          <DataGrid
            autoHeight={true}
            autoPageSize={true}
            rows={SQLtableData}
            columns={columns}
            pageSize={12}
            rowsPerPageOptions={[12]}
            density="compact"
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0
                ? "Mui-even"
                : "Mui-odd"
            }
            onRowDoubleClick={handleRowDoubleClick}
          />
        </Paper>
        {openModalNewRow && (
          <Modal
            open={openModalNewRow}
            onClose={handleCloseModalNewRow}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ModalNewRow
              props={{
                columns: columns,
                SQLtable: SQLtable,
                fetchSQLtableData: fetchSQLtableData,
                handleCloseModalNewRow: handleCloseModalNewRow,
              }}
            />
          </Modal>
        )}

        <Modal
          open={openModalDoubleClick}
          onClose={handleCloseModalDoubleClick}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ModalSelectedRow
            props={{
              selectedRow: selectedRow,
              SQLtable: SQLtable,
              fetchSQLtableData: fetchSQLtableData,
              handleCloseModalDoubleClick: handleCloseModalDoubleClick,
            }}
          />
        </Modal>
      </>
    );
  } else {
    return errMsg;
  }
};
export default FetchedTable;
