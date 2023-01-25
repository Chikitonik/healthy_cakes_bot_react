import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import CheckIcon from "@mui/icons-material/Check";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

import { useRef, useState, useEffect } from "react";
import axios from "axios";

import urls from "../../data/urls";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX =
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const REGISTER_URL = urls.REGISTER_URL;

export default function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordMatch, setShowPasswordMatch] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswordMatch = () =>
    setShowPasswordMatch((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = PWD_REGEX.test(pwd);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, email, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          // withCredentials: true,
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser("");
      setEmail("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else if (err.response?.status === 500) {
        console.log(
          "err.response.data.error.detai :>> ",
          err.response.data.error.detail
        );
      } else {
        setErrMsg("Registration Failed");
      }
      // errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <PersonAddIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {errMsg ? errMsg : "Sign up"}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Tooltip
                    disableHoverListener
                    title={
                      !validName &&
                      "4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed."
                    }
                    placement="bottom-start"
                  >
                    <TextField
                      name="username"
                      fullWidth
                      id="username"
                      ref={userRef}
                      onChange={(e) => setUser(e.target.value)}
                      value={user}
                      label={
                        <label>
                          Username
                          {validName ? (
                            <CheckIcon color="success" fontSize="20px" />
                          ) : (
                            " *"
                          )}
                        </label>
                      }
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <Tooltip
                    disableHoverListener
                    title={!validEmail && "Invalid email address."}
                    placement="bottom-start"
                  >
                    <TextField
                      name="email"
                      fullWidth
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      label={
                        <label>
                          Email Address
                          {validEmail ? (
                            <CheckIcon color="success" fontSize="20px" />
                          ) : (
                            " *"
                          )}
                        </label>
                      }
                      autoComplete="email"
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ width: "100%" }} variant="outlined">
                    <InputLabel htmlFor="password">
                      Password
                      {validPwd ? (
                        <CheckIcon color="success" fontSize="20px" />
                      ) : (
                        " *"
                      )}
                    </InputLabel>
                    <Tooltip
                      disableHoverListener
                      title={
                        !validPwd &&
                        "8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character. Allowed special characters ! @ # $ %"
                      }
                      placement="bottom-start"
                    >
                      <OutlinedInput
                        value={pwd}
                        name="password"
                        required
                        onChange={(e) => setPwd(e.target.value)}
                        fullWidth
                        id="password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </Tooltip>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ width: "100%" }} variant="outlined">
                    <InputLabel htmlFor="confirm_pwd">
                      Confirm password
                      {validMatch && pwd ? (
                        <CheckIcon color="success" fontSize="20px" />
                      ) : (
                        " *"
                      )}
                    </InputLabel>
                    <Tooltip
                      disableHoverListener
                      title={
                        !validMatch &&
                        "Must match the first password input field"
                      }
                      placement="bottom-start"
                    >
                      <OutlinedInput
                        value={matchPwd}
                        name="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        fullWidth
                        id="confirm_pwd"
                        type={showPasswordMatch ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPasswordMatch}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPasswordMatch ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Confirm password"
                      />
                    </Tooltip>
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                disabled={
                  !validName || !validPwd || !validMatch || !validEmail
                    ? true
                    : false
                }
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
}
