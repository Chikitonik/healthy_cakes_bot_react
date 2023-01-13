import React from "react";
import Button from "../Button/Button";
import { useTelegram } from "../../hooks/useTelegram";
import "./Header.css";
import Typography from "@mui/material/Typography";

const Header = () => {
  const { user, onClose } = useTelegram();
  return (
    <div className={"header"}>
      {/* <Button onClick={onClose}>Close</Button> */}
      {/* <span className={"username"}>{user?.username}</span> */}
      <Typography variant="h6" component="div" align="center">
        Choose what You want to buy
      </Typography>
    </div>
  );
};

export default Header;
