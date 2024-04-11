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

export default function sendRegistrationEmail(props) {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  let token = localStorage.getItem("token");
  const [errorState, setErrorState] = useState({
    errorCount: 0,
    nameError: "",
    emailError: "",
  });

  const handleSendEmail = () => {
    let name = nameRef.current.value;
    let email = emailRef.current.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let errorObj = {
      errorCount: 0,
      nameError: "",
      emailError: "",
    };

    if (!name) {
      errorObj.errorCount += 1;
      errorObj.nameError = "name cannot be empty.";
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
      name: name,
      email: email,
    };
    fetch("http://localhost:4000/HR/new", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(data),
      mode: "cors",
      cache: "default",
    })
      .then((res) => {
        if (res.ok) {
          alert("Successful to send the email.");
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
   
      <h2 role="title">Send a Registration Email</h2>
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
              Name of Perspective Applicant
            </InputLabel>
            <TextField
              id="username-input"
              size="small"
              style={{ marginTop: "20px" }}
              inputRef={nameRef}
              error={!!errorState.nameError}
              helperText={errorState.nameError}
            />
          </FormControl>

          <FormControl variant="standard" fullWidth>
            <InputLabel shrink htmlFor="bootstrap-input">
              Email
            </InputLabel>

            <TextField
              id="outlined-adornment-email"
              style={{ marginTop: "20px" }}
              size="small"
              error={!!errorState.emailError}
              helperText={errorState.emailError}
              inputRef={emailRef}
            />
          </FormControl>

          <Button variant="contained" fullWidth onClick={handleSendEmail}>
            Send the Signup Email
          </Button>
        </Box>
      </form>
    </div>
    </div>
  );
}
