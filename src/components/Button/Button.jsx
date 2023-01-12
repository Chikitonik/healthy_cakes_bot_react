import React from "react";
import "./Button.css";

import { Button as Ui_button } from "@mui/material";

const Button = (props) => {
  // return <button {...props} className={"button " + props.className} />;
  return (
    <Ui_button
      {...props}
      className={"button " + props.className}
      variant="contained"
    ></Ui_button>
  );
};

export default Button;
