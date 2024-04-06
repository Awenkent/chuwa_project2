import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {useRef} from 'react';
import { useSelector, useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";

import {
    setEmployee,
    selectEmployee,
  } from "../redux/employeeSlice";

export default function Header(props) {
  const searchRef = useRef();
  const dispatch = useDispatch();
  const employee = useSelector(selectEmployee);
  const matches = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const handleSearch = ()=>{
    
    if(searchRef.current.value)
    {
     dispatch(setProducts( products.filter((product)=>{
        return product.productName.indexOf(searchRef.current.value) !== -1
      })
      ))
    } 
    else
    {
      dispatch(fetchProducts());
    }
    
  
   
  }
  const handleDisplayUser = ()=>{
    console.log("handleDisplayUser")
    dispatch(setDisplayUser("block"))
  }
  const handleDisplayCart = ()=>{
    console.log("handleDisplayCart")
    dispatch(setDisplayCart("block"))
  }
  const handleSignOut = ()=>
{
    alert("SignOut Succeeful!");
    localStorage.removeItem("token");
    window.location.replace("/");
}


  if (matches) {
    return (
      <header
        style={{
          display: "flex",
          height: "60px",
          alignItems: "center",
          justifyContent: "space-evenly",
          color: "white",
          backgroundColor: "black",
          flexWrap: "nowrap",
        }}
      >
        <div style={{ flex: 1 }}>
        <h3 className ="clickable" onClick = {()=>{navigate("/")}}>
            <b>Chuwa</b> <small>Management</small>
          </h3>
        </div>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Products"
            inputProps={{ "aria-label": "search google maps" }}
            inputRef={searchRef}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </Paper>
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            flexWrap: "nowrap",
          }}
        >


            <span className="notification">
            Personal Information
          <ManageAccountsOutlinedIcon className="icon clickable" fontSize="medium" onClick={()=>{navigate("/profile")}}/>
          Visa Status Management
          <ShoppingCartOutlinedIcon className="icon clickable" fontSize="medium" onClick={handleDisplayCart}/>
          </span>

          
          {employee.employeeName !== null?
          (<span className ="clickable" style={{ margin: "0 10px" ,whiteSpace:"nowrap"}} onClick={handleSignOut}>
             Sign Out
          </span>) :
            (
            <span className ="clickable" style={{ margin: "0 10px",whiteSpace:"nowrap" }} onClick={()=>{navigate("/signin")}}>
              Sign in
            </span>
            )
          }
          

        
   

         
          
        
         
        </div>
      </header>
    );
  } else {
    return (
      <header>
      
      </header>
    );
  }
}
