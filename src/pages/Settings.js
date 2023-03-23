import React from "react";
import Paper from "@mui/material/Paper";
import useFetchSQLUserData from "../hooks/useFetchSQLUserData";
import useFetchSQLUserAddress from "../hooks/useFetchSQLUserAddress";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Edit, Save, Cancel } from "@mui/icons-material";
import { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import urls from "../data/urls";
import axios from "axios";
import FetchedTableUser from "../components/FetchedTable/FetchedTableUser";
import { ModalNewAddress } from "../components/FetchedTable/ModalNewAddress";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const Settings = () => {
  const EMAIL_REGEX =
    /^(([^<>()\[\]\.,;:\s@\"\/\\]+(\.[^<>()\[\]\.,;:\s@\"\/\\]+)*)|(\"[^\"]+\"))@(([^<>()\[\]\.,;:\s@\"\/\\]+\.)+[^<>()\[\]\.,;:\s@\"\/\\]{2,})$/i;
  //#region email
  const [SQLtableData, errMsg] = useFetchSQLUserData();
  const [email, setEmail] = React.useState(
    SQLtableData && SQLtableData.length > 0 ? SQLtableData[0].email : ""
  );
  const [validEmail, setValidEmail] = useState(false);
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  const [isEditing, setIsEditing] = React.useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    SQLtableData[0].email = email;
    console.log("SQLtableData :>> ", SQLtableData);
    console.log("SQLtableData[0] :>> ", SQLtableData[0]);
    try {
      const response = await axios.put(
        urls.USER_SETTINGS +
          "update/" +
          "users/" +
          JSON.stringify(SQLtableData[0]),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (err) {
      console.log("err :>> ", err);
      //   setPopoverContent(err.response.data.error);
      //   setPopoverShow(true);
      if (!err?.response) {
        // setErrMsg("No Server Response");
      }
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  React.useEffect(() => {
    if (SQLtableData && SQLtableData.length > 0) {
      setEmail(SQLtableData[0].email);
    }
  }, [SQLtableData]);
  //#endregion email

  //#region address
  const [SQLtableAddress, errMsgAddress] = useFetchSQLUserAddress();

  const [address, setAddress] = React.useState(
    SQLtableAddress && SQLtableAddress.length > 0
      ? SQLtableAddress[0].address
      : ""
  );

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [editRowIndex, setEditRowIndex] = useState(-1);
  // console.log("isEditingAddress :>> ", isEditingAddress);
  // console.log("editRowIndex :>> ", editRowIndex);

  const handleEditClickAddress = (index) => {
    console.log("index :>> ", index);
    setIsEditingAddress(true);
    setEditRowIndex(index);
  };
  const handleSaveClickAddress = async (index) => {
    setIsEditingAddress(false);
    try {
      const response = await updateAddress(SQLtableAddress[index]);
      // console.log("response :>> ", response);
    } catch (err) {
      // console.log("err :>> ", err);
      if (!err?.response) {
        // handle error
      }
    }
  };

  const updateAddress = async (addressObj) => {
    console.log("addressObj :>> ", addressObj);
    const response = await axios.put(
      urls.USER_SETTINGS +
        "update/" +
        "customer_address/" +
        JSON.stringify(addressObj),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response;
  };

  const handleDeleteClickAddress = async (index) => {
    const id = SQLtableAddress[index].id;
    if (confirm("⚠️ Are you sure you want to delete this row!?")) {
      try {
        const response = await axios.delete(
          urls.ADMIN_URL + "delete/customer_address/" + id,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      } catch (err) {
        // console.log("err :>> ", err);
        if (err.response.data.error.includes("referenced")) {
          alert(
            "Unable to delete, because there is an order with this address id"
          );
        }
        if (!err?.response) {
          setErrMsg("No Server Response");
        }
      }
    } else {
      // execute the code for "No"
    }
    window.location.reload();
  };

  React.useEffect(() => {
    if (SQLtableAddress && SQLtableAddress.length > 0) {
      setAddress(SQLtableAddress[0].address);
    }
  }, [SQLtableAddress]);

  // #endregion address
  // #region modal
  const [openModalNewRow, setOpenModalNewAddress] = React.useState(false);
  const handleCloseModalNewAddress = () => setOpenModalNewAddress(false);
  // const [SQLtableData, setSQLtableData] = React.useState();
  // const [errMsg, setErrMsg] = React.useState("No data");
  const handleNewAddress = () => {
    setOpenModalNewAddress(true);
  };
  const fetchSQLtableData = () => {
    window.location.reload();
  };
  // #endregion modal
  return (
    <Box
      sx={{
        p: 3,
        // background: "#DCF9D7",
        // minHeight: "97vh",
      }}
    >
      <Paper elevation={3} sx={{ p: 2 }}>
        {/* <FetchedTableUser SQLtable="customer_address" /> */}
        {/* <FetchedTableUser SQLtable="users" /> */}
        {/* {JSON.stringify(SQLtableData)} */}
        {/* <br /> */}
        {/* {JSON.stringify(SQLtableAddress)} */}
        {/* <br /> */}
        <Typography variant="h6" gutterBottom>
          Email
        </Typography>
        <Tooltip
          disableHoverListener
          title={!validEmail && "Invalid email address."}
          placement="bottom-start"
        >
          <TextField
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={true && !isEditing}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {!isEditing ? (
                    <IconButton
                      onClick={handleEditClick}
                      sx={{
                        color: "lightgreen",
                        "&:hover": {
                          color: "green",
                        },
                      }}
                    >
                      <Edit />
                    </IconButton>
                  ) : (
                    <>
                      <IconButton
                        disabled={!validEmail}
                        onClick={handleSaveClick}
                        sx={{
                          color: "lightblue",
                          "&:hover": {
                            color: "blue",
                          },
                        }}
                      >
                        <Save />
                      </IconButton>
                      <IconButton
                        onClick={handleCancelClick}
                        sx={{
                          color: "pink",
                          "&:hover": {
                            color: "red",
                          },
                        }}
                      >
                        <Cancel />
                      </IconButton>
                    </>
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Tooltip>
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Addresses
        </Typography>
        {SQLtableAddress &&
          SQLtableAddress.map((row, index) => (
            <>
              <br />
              <TextField
                variant="standard"
                key={index}
                value={row.address}
                onChange={(e) => {
                  const updatedAddress = e.target.value;
                  const updatedRows = [...SQLtableAddress];
                  updatedRows[index].address = updatedAddress;
                  setAddress(updatedRows);
                }}
                // disabled={!isEditingAddress}
                disabled={editRowIndex !== index}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {!isEditingAddress || editRowIndex !== index ? (
                        <IconButton
                          onClick={() => handleEditClickAddress(index)}
                          sx={{
                            color: "lightgreen",
                            "&:hover": {
                              color: "green",
                            },
                          }}
                        >
                          <Edit />
                        </IconButton>
                      ) : (
                        <>
                          <IconButton
                            onClick={() => {
                              handleSaveClickAddress(index);
                              setIsEditingAddress(false);
                              setEditRowIndex(-1);
                            }}
                            sx={{
                              color: "lightblue",
                              "&:hover": {
                                color: "blue",
                              },
                            }}
                          >
                            <Save />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              // setAddress(SQLtableAddress);
                              setIsEditingAddress(false);
                              setEditRowIndex(-1); //
                            }}
                            sx={{
                              color: "pink",
                              "&:hover": {
                                color: "red",
                              },
                            }}
                          >
                            <Cancel />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              handleDeleteClickAddress(index);
                              setIsEditingAddress(false);
                              setEditRowIndex(-1); //
                            }}
                            sx={{
                              color: "pink",
                              "&:hover": {
                                color: "red",
                              },
                            }}
                          >
                            <DeleteForeverIcon />
                          </IconButton>
                        </>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </>
          ))}
        <br />
        <Button
          variant="contained"
          // color="error"
          // value={selectedRow.id}
          onClick={handleNewAddress}
          sx={{ mt: 3 }}
        >
          Add new address
        </Button>
        {openModalNewRow && (
          <Modal
            open={openModalNewRow}
            onClose={handleCloseModalNewAddress}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ModalNewAddress
              props={{
                // columns: ["address"],
                // SQLtable: "customer_address",
                fetchSQLtableData: fetchSQLtableData,
                handleCloseModalNewAddress: handleCloseModalNewAddress,
              }}
            />
          </Modal>
        )}
      </Paper>
    </Box>
  );
};

export default Settings;
