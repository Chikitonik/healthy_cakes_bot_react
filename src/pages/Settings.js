import React from "react";
import Paper from "@mui/material/Paper";
import useFetchSQLUserData from "../hooks/useFetchSQLUserData";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Edit, Save, Cancel } from "@mui/icons-material";
import { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";

export const Settings = () => {
  const EMAIL_REGEX =
    /^(([^<>()\[\]\.,;:\s@\"\/\\]+(\.[^<>()\[\]\.,;:\s@\"\/\\]+)*)|(\"[^\"]+\"))@(([^<>()\[\]\.,;:\s@\"\/\\]+\.)+[^<>()\[\]\.,;:\s@\"\/\\]{2,})$/i;

  const [SQLtableData, errMsg] = useFetchSQLUserData();

  const [email, setEmail] = React.useState(
    SQLtableData && SQLtableData.length > 0 ? SQLtableData[0].email : ""
  );
  const [validEmail, setValidEmail] = useState(false);
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  const [isEditing, setIsEditing] = React.useState(false);

  const handleInputChange = (event) => {
    setEmail(event.target.email);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // props.onSave(email);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    // setEmail(props.email);
  };

  React.useEffect(() => {
    if (SQLtableData && SQLtableData.length > 0) {
      setEmail(SQLtableData[0].email);
    }
  }, [SQLtableData]);

  return (
    <Paper
      elevation={3}
      sx={{
        height: "95wh",
        width: "95vw",
        ml: 2,
      }}
    >
      {JSON.stringify(SQLtableData)}
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
    </Paper>
  );
};

export default Settings;
