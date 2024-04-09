import React from "react";
import { useState, useRef, useEffect } from "react";
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
import Application from "./application";
import { useSelector, useDispatch } from "react-redux";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom';
import {
  setEmployee,
  selectEmployee,
  selectAllEmployees,
  fetchEmployee,
  setEmployeeProfile
} from "../redux/employeeSlice";
export default function hrViewApplicationPage(props) {
  let { employeeId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, []);
  const [editMode, setEditMode] = useState(false);
  const AllEmployees = useSelector(selectAllEmployees);
  const employee=AllEmployees.filter((employee)=>employee._id === employeeId);
  
  console.log("In hrViewApplicationPage:"+employee);
  if (!AllEmployees) {
    return <div>Loading...</div>; // Render loading state while employees are being fetched
  }

 if(!editMode)  
return(
  <>
  <Button onClick={()=>{setEditMode(true)}}>Edit</Button>
  <div>profile</div>
  <div>
    Employee Name: {employee.personalProfile.firstName}  {employee.personalProfile.employeeMiddleName}  {employee.personalProfile.employeeLastName}
  </div>
  <div>
    Phone: {employee.personalProfile.employeePhoneNumber} 
  </div>
  <div>
    Email: {employee.personalProfile.employeeEmail} 
  </div>
  <div>
    SSN: {employee.personalProfile.employeeEmail} 
  </div>
  <div>
    Address: {employee.personalProfile.employeeStreetName} + {employee.personalProfile.employeeBuildingApt} + {employee.personalProfile.employeeCity} + {employee.personalProfile.employeeState} + {employee.personalProfile.employeeZip}
  </div>
  </> 
)
else
{
  return(
  <>
  <Button onClick={()=>{setEditMode(false)}}>Exit</Button>
  <Application/>
  </>
  )

}

}