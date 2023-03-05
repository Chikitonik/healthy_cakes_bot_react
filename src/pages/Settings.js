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

export const Settings = () => {
  const EMAIL_REGEX =
    /^(([^<>()\[\]\.,;:\s@\"\/\\]+(\.[^<>()\[\]\.,;:\s@\"\/\\]+)*)|(\"[^\"]+\"))@(([^<>()\[\]\.,;:\s@\"\/\\]+\.)+[^<>()\[\]\.,;:\s@\"\/\\]{2,})$/i;
  // email
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
    try {
      const response = await axios.put(
        urls.USER_SETTINGS + "update/" + JSON.stringify(SQLtableData[0]),
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

  // address
  const [SQLtableAddress, errMsgAddress] = useFetchSQLUserAddress();

  const [address, setAddress] = React.useState(
    SQLtableAddress && SQLtableAddress.length > 0
      ? SQLtableAddress[0].address
      : ""
  );

  const [isEditingAddress, setIsEditingAddress] = React.useState(false);

  const handleEditClickAddress = () => {
    setIsEditingAddress(true);
  };

  const handleSaveClickAddress = async () => {
    setIsEditingAddress(false);
    SQLtableAddress[0].address = address;
    console.log("SQLtableAddress :>> ", SQLtableAddress);
    try {
      const response = await axios.put(
        urls.USER_SETTINGS + "update/" + JSON.stringify(SQLtableAddress[0]),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (err) {
      console.log("err :>> ", err);
      if (!err?.response) {
      }
    }
  };

  const handleCancelClickAddress = () => {
    setIsEditingAddress(false);
  };

  React.useEffect(() => {
    if (SQLtableAddress && SQLtableAddress.length > 0) {
      setAddress(SQLtableAddress[0].address);
    }
  }, [SQLtableAddress]);

  return (
    <Paper
      elevation={3}
      sx={{
        height: "95wh",
        width: "95vw",
        ml: 2,
      }}
    >
      <FetchedTableUser SQLtable="customer_address" />
      <FetchedTableUser SQLtable="users" />
      {JSON.stringify(SQLtableData)}
      <br />
      {JSON.stringify(SQLtableAddress)}
      <br />

      <Tooltip
        disableHoverListener
        title={!validEmail && "Invalid email address."}
        placement="bottom-start"
      >
        <TextField
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

      <TextField
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        disabled={true && !isEditingAddress}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {!isEditingAddress ? (
                <IconButton
                  onClick={handleEditClickAddress}
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
                    onClick={handleSaveClickAddress}
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
                    onClick={handleCancelClickAddress}
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
    </Paper>
  );
};

export default Settings;
