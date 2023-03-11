import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CakeIcon from "@mui/icons-material/Cake";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./navbar.css";
import useAuth from "../../hooks/useAuth";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState, useEffect, useContext } from "react";
import { Context } from "../Provider/Provider";
import SettingsIcon from "@mui/icons-material/Settings";

export default function Navbar() {
  const { auth } = useAuth();

  const { cartRowsCount, setCartRowsCount } = useContext(Context);
  const { ordersRowsCount, setOrdersRowsCount } = useContext(Context);
  // console.log("cartRowsCount :>> ", cartRowsCount);

  const theme = createTheme({
    palette: {
      neutral: {
        main: "#72C879",
        contrastText: "#fff",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, mb: 10 }}>
        <AppBar position="fixed" color="neutral">
          <Toolbar>
            <CakeIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 5,
                //   display: { xs: "none", md: "flex" },
                //   fontFamily: "monospace",
                //   fontWeight: 700,
                //   letterSpacing: ".0rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Healthy cakes store
            </Typography>

            <Typography
              variant="h6"
              color="inherit"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              {useLocation().pathname.substring(1)}
            </Typography>
            {/* <MenuItem key="About" onClick="">
            <Typography textAlign="center">About</Typography>
          </MenuItem> */}
            <Button color="inherit">
              <Link to="/store">Store</Link>
            </Button>

            <Button color="inherit">
              <Link to="/register">Register</Link>
            </Button>

            <Button color="inherit">
              <Link to="/login">Login</Link>
            </Button>

            <Button color="inherit">
              <Link to="/home">Home</Link>
            </Button>

            <Button color="inherit">
              <Link to="/about">About</Link>
            </Button>

            <Button color="inherit">
              <Link to="/admin">Admin</Link>
            </Button>

            <Typography variant="h6" color="inherit" component="div">
              {auth.user}
            </Typography>

            <IconButton
              size="large"
              // aria-label="show cart items"
              color="inherit"
            >
              <Badge badgeContent={cartRowsCount} color="error">
                <Link to="/cart">
                  <ShoppingCartIcon />
                </Link>
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={ordersRowsCount} color="error">
                <Link to="/orders">
                  <LocalShippingIcon />
                </Link>
              </Badge>
            </IconButton>
            <IconButton size="large" color="inherit">
              <Link to="/settings">
                <SettingsIcon />
              </Link>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
