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
import { useParams } from "react-router-dom";
import { Input } from "@mui/material";

const verifySignupToken = async (signupToken) => {
  const email = await fetch("http://localhost:4000/employee/signupToken", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${signupToken}`,
    },
    mode: "cors",
    cache: "default",
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      alert("invaild sign up link");
      return "";
    }
  });
  return email;
};

export default function signup(props) {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  let { signupToken } = useParams();
  const [email, setEmail] = useState([]);
  useEffect(() => {
    verifySignupToken(signupToken)
        .then((res) => {
          setEmail((prev) => res);
        })
        .catch((err) => {
          alert(err);
        });
  }, []);
  const emailRef = useRef(email);
  console.log("signupToken" + signupToken);
  console.log("email" + email);
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

  const handleSignup = () => {
    let username = usernameRef.current.value;
    let password = passwordRef.current.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //const signupToken = localStorage.getItem("signupToken");
    //const signupToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJIUiI6eyJ1c2VyTmFtZSI6InRlc3QiLCJyb2xlIjoiaHIifSwiaWF0IjoxNzEyMzUzMTQzLCJleHAiOjE3MTIzNjM5NDN9.w0zyYa90tcYVgqdRcoIE9LvtiuhOcZ0_Y2Wc46FaeEM";
    //const signupToken="";
    let errorObj = {
      errorCount: 0,
      usernameError: "",
      passwordError: "",
      emailError: "",
    };

    if (!username) {
      errorObj.errorCount += 1;
      errorObj.usernameError = "Username cannot be empty.";
    }

    if (!password) {
      errorObj.errorCount += 1;
      errorObj.passwordError = "Password cannot be empty.";
    }

    if (!email) {
      errorObj.errorCount += 1;
      errorObj.emailError = "email cannot be empty.";
    }

    if (!emailRegex.test(email)) {
      errorObj.errorCount += 1;
      errorObj.emailError = "Please input a vaild email address.";
    }

    if (errorObj.errorCount > 0) {
      setErrorState(() => {
        return errorObj;
      });
      alert("One or more input is invalid, please try again");
      return;
    }

    let data = {
      role: "employee",
      userName: username,
      password: password,
      email: email,
      applicationStatus: "Never Submitted",
    };
    fetch("http://localhost:4000/employee/signup", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${signupToken}`,
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(data),
      mode: "cors",
      cache: "default",
    })
      .then((res) => {
        if (res.status === 201) {
          alert(
            "Your account has been created, please varify the email address before login."
          );
          navigate("/signin");
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
  if (!email) {
    return <div>Loading...</div>; // Render loading state while employees are being fetched
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "50px auto",
        backgroundColor: "white",
      }}
    >
      <div style={{ padding: "20px 50px" }}>
        <h2 role="title">Sign up an account</h2>
        <form action="" style={{ textAlign: "center" }}>
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
                id="username-input"
                size="small"
                style={{ marginTop: "20px" }}
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

            <FormControl variant="standard" fullWidth>
              <InputLabel shrink htmlFor="bootstrap-input">
                Email(Read Only)
              </InputLabel>

              <TextField
                id="outlined-adornment-email"
                style={{ marginTop: "20px" }}
                size="small"
                error={!!errorState.emailError}
                helperText={errorState.emailError}
                inputRef={emailRef}
                InputProps={{
                  readOnly: true, // Set this to true to make the input read-only
                }}
                value={email}
              />
            </FormControl>

            <Button variant="contained" fullWidth onClick={handleSignup}>
              Sign up
            </Button>
            <h5 style={{ width: "100%", textAlign: "left" }}>
              Already have an account?
              <a
                className="clickable"
                style={{
                  textDecorationLine: "underline",
                  color: "rgb(80,72,229)",
                }}
                onClick={() => {
                  navigate("/signin");
                }}
              >
                {" "}
                Signin
              </a>
            </h5>
          </Box>
        </form>
      </div>
    </div>
  );
}
