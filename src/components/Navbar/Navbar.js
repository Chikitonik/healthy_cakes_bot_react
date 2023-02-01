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
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./navbar.css";
import useAuth from "../../hooks/useAuth";

export default function Navbar() {
  const { auth } = useAuth();

  return (
    <Box sx={{ flexGrow: 1, mb: 3 }}>
      <AppBar position="static">
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
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
