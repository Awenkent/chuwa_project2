import React from "react";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Input } from "@mui/material";
import {
  setEmployee,
  selectEmployee,
  fetchCurrentEmployee,
} from "../redux/employeeSlice";
export default function Signin(props) {
  const employee = useSelector(selectEmployee);
  const dispatch = useDispatch();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const [errorState, setErrorState] = useState({
    errorCount: 0,
    usernameError: "",
    passwordError: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  console.log(employee);

  if(employee.userName !== null)
  {
    navigate("/");
  }


  const handleSignin = () => {
    var username = usernameRef.current.value;
    var password = passwordRef.current.value;
    let errorObj = {
      errorCount: 0,
    };

    if (!username) {
      errorObj.errorCount += 1;
      errorObj.usernameError = "Username cannot be empty.";
    }

    if (!password) {
      errorObj.errorCount += 1;
      errorObj.passwordError = "Password cannot be empty.";
    }

    console.log(errorObj);
    if (errorObj.errorCount > 0) {
      setErrorState(() => {
        return errorObj;
      });
      alert("One or more input is invalid, please try again");
      return;
    }

    var data = {
      userName: username,
      password: password,
    };
    fetch("http://localhost:4000/employee/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(data),
      mode: "cors",
      cache: "default",
    })
      .then((res) => {
        if (res.ok) {
          return res.json().then((json) => {
            console.log(JSON.stringify(json));
            localStorage.setItem("token", json.token);
            // localStorage.setItem("email", json.email);
            alert("Login successful!");
            dispatch(fetchCurrentEmployee()).then(()=>{
              navigate("/");
            })
          });
        } else {
          return res.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "50px auto",
        backgroundColor: "white",
      }}
    >
      <div style={{ padding: "20px 50px" }}>
        <h2 role="title">Sign in to your account</h2>
        <form style={{ textAlign: "center" }}>
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gridTemplateColumns: { sm: "1fr 1fr" },
              gap: 3,
            }}
          >
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink htmlFor="bootstrap-input">
                Username
              </InputLabel>
              <TextField
                style={{ marginTop: "20px" }}
                size="small"
                id="password-input"
                inputRef={usernameRef}
                error={!!errorState.usernameError}
                helperText={errorState.usernameError}
              />
            </FormControl>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink htmlFor="bootstrap-input">
                password
              </InputLabel>

              <TextField
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                style={{ marginTop: "20px" }}
                size="small"
                error={!!errorState.passwordError}
                helperText={errorState.passwordError}
                inputRef={passwordRef}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <Button variant="contained" fullWidth onClick={handleSignin}>
              Sign In
            </Button>
            <h5 style={{ width: "100%", textAlign: "left" }}>
              Don't have an account?
              <a
                className="clickable"
                style={{
                  textDecorationLine: "underline",
                  color: "rgb(80,72,229)",
                }}
                onClick={() => {
                  navigate("/signup");
                }}
              >
                {" "}
                Signup
              </a>
            </h5>
          </Box>
        </form>
      </div>
    </div>
  );
}
