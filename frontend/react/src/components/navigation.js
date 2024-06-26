import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";

import { setEmployee, selectEmployee } from "../redux/employeeSlice";

export default function Header(props) {
  const searchRef = useRef();
  const dispatch = useDispatch();
  const employee = useSelector(selectEmployee);
  const matches = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSearch = () => {
    if (searchRef.current.value) {
      dispatch(
        setProducts(
          products.filter((product) => {
            return product.productName.indexOf(searchRef.current.value) !== -1;
          })
        )
      );
    } else {
      dispatch(fetchProducts());
    }
  };
  const handleDisplayUser = () => {
    console.log("handleDisplayUser");
    dispatch(setDisplayUser("block"));
  };
  const handleDisplayCart = () => {
    console.log("handleDisplayCart");
    dispatch(setDisplayCart("block"));
  };
  const handleSignOut = () => {
    alert("Sign Out Successfully!");
    localStorage.removeItem("token");
    window.location.replace("/");
  };

  if (matches) {
    return (
      <header
        style={{
          display: "flex",
          height: "60px",
          alignItems: "center",
          justifyContent: "space-evenly",
          color: "white",
          backgroundColor: "rgb(25,118,210)",
          flexWrap: "nowrap",
        }}
      >
        <div style={{ flex: 1 }}>
          <h3
            style={{ cursor: "pointer" }}
            className="clickable"
            onClick={() => {
              navigate("/profile");
            }}
          >
            <b>Chuwa</b> <small>Management</small>
          </h3>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            gap: "10px",
            flexWrap: "nowrap",
          }}
        >
          {employee.role === "hr" ? (
            <>
              <span
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <Button style={{ color: "white", textTransform: "none" }}>
                  {" "}
                  HR Dashboard{" "}
                </Button>
              </span>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    navigate("/hrEmployeeProfiles");
                  }}
                >
                  Employee Profiles
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    navigate("/hr/visastatus");
                  }}
                >
                  Employee Visa Status Management
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    navigate("/hiringManagement");
                  }}
                >
                  View Applications
                </MenuItem>
              </Menu>
            </>
          ) : (
            ""
          )}

          <span
            onClick={() => {
              navigate("/profile");
            }}
          >
            <Button style={{ color: "white", textTransform: "none" }}>
              Profile
            </Button>
          </span>

          <span
            onClick={() => {
              navigate("/visastatus");
            }}
          >
            <Button style={{ color: "white", textTransform: "none" }}>
              Visa Status
            </Button>
          </span>

          {employee.employeeName !== null ? (
            <span
              className="clickable"
              style={{ margin: "0 10px", whiteSpace: "nowrap" }}
              onClick={handleSignOut}
            >
              <Button style={{ color: "white", textTransform: "none" }}>
                {" "}
                Sign Out
              </Button>
            </span>
          ) : (
            <span
              className="clickable"
              style={{ margin: "0 10px", whiteSpace: "nowrap" }}
              onClick={() => {
                navigate("/signin");
              }}
            >
              <Button style={{ color: "white", textTransform: "none" }}>
                {" "}
                Sign in
              </Button>
            </span>
          )}
        </div>
      </header>
    );
  } else {
    return <header></header>;
  }
}
