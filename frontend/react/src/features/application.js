import React from "react";
import { useState, useRef, useEffect } from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import FileUpload from "../components/fileUpload";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useNavigate, useLocation } from "react-router-dom";
import {
    setEmployee,
    selectEmployee,
    fetchCurrentEmployee,
    setEmployeeProfile,
    updateEmployee
  } from "../redux/employeeSlice";


const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "white" : "white",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 16,
    width: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default function application(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const errorToPropMapping = {
    required: "This field is required",
    maxLength: "Max Length exceeded",
    pattern: "Incorrect Format",
  };

  const employee = useSelector(selectEmployee);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const watchemployeeWorkAuth = watch("employeeWorkAuth",(employee.personalProfile?.workAuth ? employee.personalProfile?.workAuth?.type :"Citizen"));
  
  const watchProfilePicture= watch("employeeProfilePicture",(employee?.personalProfile?.profilePictureLink? employee.personalProfile.profilePictureLink
    :"https://preyash2047.github.io/assets/img/no-preview-available.png?h=824917b166935ea4772542bec6e8f636"))
  console.log(employee)
  console.log(employee.personalProfile)
  const [imagePreview,setImagePreview] = useState(employee?.personalProfile?.profilePictureLink? employee.personalProfile.profilePictureLink
    :"https://preyash2047.github.io/assets/img/no-preview-available.png?h=824917b166935ea4772542bec6e8f636")
  const [files,setFiles] = useState(employee.personalProfile.documents);
console.log(employee)
  const handleEmployeeProfileImageUpload = ()=>
  {
     setImagePreview(watchProfilePicture)
  }


  const matches = useMediaQuery("(min-width:600px)");
  useEffect(() => {
    if (employee.userName === null) {
      navigate("/");
    }
  }, []);

 const onSubmit = (data) => {
  console.log("sbb")
  let next = "None";
  
  
  let obj =
  {
    firstName : data.employeeFirstName,
    middleName:data.employeeMiddleName,
    applicationStatus: employee.applicationStatus === "Never Submitted" ? "Pending" : employee.applicationStatus,
    lastName: data.employeeLastName,
    email:data.employeeEmail,
    preferredName :data.employeePrederredName,
    dateOfBirth :data.employeeDateOfBirth,
    profilePictureLink:data.employeeProfilePicture,
    cellPhoneNumber:data.employeePhoneNumber,
    SSN:data.employeeSsn,
  
    gender:data.employeeGender,
  
    currentAddress:
    {
      buildingAptNumber:data.employeeBuildingApt,
      streetName:data.employeeStreetName,
      city:data.employeeCity,
      state:data.employeeState,
      zip:data.employeeZip
    },
    reference:{
      firstName:data.employeeReferenceFirstName,
      middleName:data.employeeReferenceMiddleName,
      lastName:data.employeeReferenceLastName,
      relationship:data.employeeReferenceRelationship
    },

  
    documents:files,
   
   
  }
  if(employee.applicationStatus === "Never Submitted")
  {
    obj.optStage = data.employeeWorkAuth === "F1(CPT/OPT)" ? "RECEIPT" : "NONE",
    obj.optStatus = data.employeeWorkAuth === "F1(CPT/OPT)" ? "Pending" :"APPROVED"
    obj.workAuth = {
      type: data.employeeWorkAuth,
      startDate: data.employeeWorkAuthStartDate,
      endDate: data.employeeWorkAuthEndDate,
    },
    obj.nextSteps = "Wait for HR to approve the onboarding application"
  }
   
  console.log(obj)
  dispatch(updateEmployee(obj)).then(()=>{
     alert("Update Successful!")
  navigate("/")}).catch((error)=>{
    alert(error)
  })
 
}

  
    return (
      <div style={{maxWidth:"800px", margin:"0 auto"}}>
        <h2>{location.state ?"Update Product" : "Create Product"}</h2>
        <div
          style={{
            padding: "20px 50px",
            margin: "50px",
            backgroundColor: "white",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gridTemplateColumns: { sm: "1fr 1fr" },
                gap: 3,
              }}
            >
                  <div style={{ borderTop:"1px solid gray", width:"100%"}}><h5 style={{margin:"10px 0"}}>Personal Information</h5></div>
               <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "start",
                  gap: "20px",
                }}>
                   
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  First Name
                </InputLabel>
                <TextField
                  defaultValue={
                    employee.personalProfile
                      ? employee.personalProfile.firstName
                      : ""
                  }
                  style={{ marginTop: "20px" }}
                  {...register("employeeFirstName", {
                    required: true,
                    maxLength: 20,
                    pattern: /^[A-Za-z]+$/i,
                  })}
                  size="small"
                  id="name-input"
                  erro
                  error={!!errors?.employeeFirstName}
                  helperText={
                    errors?.employeeFirstName?.type
                      ? errorToPropMapping[errors?.employeeFirstName?.type]
                      : ""
                  }
                />
              </FormControl>

              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Middle Name
                </InputLabel>
                <TextField
                  defaultValue={
                    employee.personalProfile
                      ? employee.personalProfile.middleName
                      : ""
                  }
                  style={{ marginTop: "20px" }}
                  {...register("employeeMiddleName", {
                    maxLength: 20,
                    pattern: /^[A-Za-z]+$/i,
                  })}
                  size="small"
                  id="name-input"
                  erro
                  error={!!errors?.employeeMiddleName}
                  helperText={
                    errors?.employeeMiddleName?.type
                      ? errorToPropMapping[errors?.employeeMiddleName?.type]
                      : ""
                  }
                />
              </FormControl>

              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Last Name
                </InputLabel>
                <TextField
                  defaultValue={
                    employee.personalProfile
                      ? employee.personalProfile.lastName
                      : ""
                  }
                  style={{ marginTop: "20px" }}
                  {...register("employeeLastName", {
                    required: true,
                    maxLength: 20,
                    pattern: /^[A-Za-z]+$/i,
                  })}
                  size="small"
                  id="name-input"
                  erro
                  error={!!errors?.employeeLastName}
                  helperText={
                    errors?.employeeLastName?.type
                      ? errorToPropMapping[errors?.employeeLastName?.type]
                      : ""
                  }
                />
              </FormControl>
            </div>

            <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Preferred Name
                </InputLabel>
                <TextField
                  defaultValue={
                    employee.personalProfile
                      ? employee.personalProfile.lastName
                      : ""
                  }
                  style={{ marginTop: "20px" }}
                  {...register("employeePrederredName", {
                    required: true,
                    maxLength: 20,
                    pattern: /^[A-Za-z]+$/i,
                  })}
                  size="small"
                  id="name-input"
                  erro
                  error={!!errors?.employeePrederredName}
                  helperText={
                    errors?.employeePrederredName?.type
                      ? errorToPropMapping[errors?.employeePrederredName?.type]
                      : ""
                  }
                />
              </FormControl>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "start",
                gap: "20px",
              }}
            >
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Phone Number
                </InputLabel>
                <TextField
                  style={{ marginTop: "20px" }}
                  defaultValue={
                    employee.personalProfile
                      ? employee.personalProfile.cellPhoneNumber
                      : ""
                  }
                  {...register("employeePhoneNumber", {
                    required: true,
                    maxLength: 20,
                    pattern:
                      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                  })}
                  size="small"
                  id="name-input"
                  error={!!errors?.employeePhoneNumber}
                  helperText={
                    errors?.employeePhoneNumber?.type
                      ? errorToPropMapping[errors?.employeePhoneNumber?.type] +
                        " Example:(123)4567890"
                      : ""
                  }
                />
              </FormControl>

              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Email
                </InputLabel>
                <TextField
                  style={{ marginTop: "20px" }}
                  defaultValue={
                    employee.personalProfile
                      ? employee.personalProfile.email
                      : ""
                  }
                  {...register("employeeEmail", {
                    required: true,
                    maxLength: 120,
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                  size="small"
                  id="name-input"
                  error={!!errors?.employeeEmail}
                  helperText={
                    errors?.employeeEmail?.type
                      ? errorToPropMapping[errors?.employeeEmail?.type] +
                        " Example:user@mail.com"
                      : ""
                  }
                />
              </FormControl>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "start",
                gap: "20px",
              }}
            >
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  SSN
                </InputLabel>
                <TextField
                  style={{ marginTop: "20px" }}
                  defaultValue={
                    employee.personalProfile
                      ? employee.personalProfile.SSN
                      : ""
                  }
                  {...register("employeeSsn", {
                    required: true,
                    maxLength: 20,
                    pattern: /^\d{3}-\d{2}-\d{4}$/,
                  })}
                  size="small"
                  id="name-input"
                  error={!!errors?.employeeSsn}
                  helperText={
                    errors?.employeeSsn?.type
                      ? errorToPropMapping[errors?.employeeSsn?.type] +
                        " Example: 123-45-6778"
                      : ""
                  }
                />
              </FormControl>

              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Date of Birth
                </InputLabel>
                <TextField
                  style={{ marginTop: "20px" }}
                  defaultValue={
                    employee.personalProfile
                      ? employee.personalProfile.dateOfBirth
                      : ""
                  }
                  {...register("employeeDateOfBirth", {
                    required: true,
                    maxLength: 120,
                    pattern:
                      /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/,
                  })}
                  size="small"
                  id="name-input"
                  error={!!errors?.employeeDateOfBirth}
                  helperText={
                    errors?.employeeDateOfBirth?.type
                      ? errorToPropMapping[errors?.employeeDateOfBirth?.type] +
                        " Example: MM/DD/YYYY"
                      : ""
                  }
                />
              </FormControl>

              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Gender
                </InputLabel>
                <Select

              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
        size="small"
        defaultValue={employee.personalProfile? employee.personalProfile.gender:"NoAnswer"}
        style={{ marginTop: "12px" }}  {...register("employeeGender")} 
      >

            <MenuItem key={"Male"} value={"Male"}>
              {"Male"}
            </MenuItem>
            <MenuItem key={"Female"} value={"Female"}>
              {"Female"}
            </MenuItem>
            <MenuItem key={"NoAnswer"} value={"NoAnswer"}>
              {"Preferre not to answer"}
            </MenuItem>
            </Select>
              
              </FormControl>
              </div>
             
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Profile Image
                </InputLabel>
                <BootstrapInput style={{ marginTop: "20px" }}  defaultValue={employee.personalProfile? employee.personalProfile.profilePictureLink:""} {...register("employeeProfilePicture", { required: true, maxLength: 120})} size="small" id="name-input" 
                error = {!!(errors?.employeeProfilePicture)} helperText={           
                  (errors?.employeeProfilePicture?.type) ?  errorToPropMapping[errors?.employeeProfilePicture?.type]+ " Example: MM/DD/YYYY" :"" 
                }
                endAdornment={ 
                <InputAdornment position="end">
                      <Button
                        size="small"
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        onClick ={handleEmployeeProfileImageUpload} 
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload
                      </Button>
                    </InputAdornment>}/>
              
              </FormControl>
              <div>
                
              <img height={150} src={imagePreview}></img>
            </div>
            <div>
              <div style={{ borderTop: "1px solid gray", width: "100%" }}>
                <h5 style={{ margin: "10px 0" }}>Address</h5>
              </div>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Building/Apt Number
                </InputLabel>
                <TextField style={{ marginTop: "20px" }} defaultValue={employee.personalProfile? employee.personalProfile?.currentAddress?.buildingAptNumber:""} {...register("employeeBuildingApt", { required: true, maxLength: 120})} size="small" id="name-input" 
                 error = {!!(errors?.employeeBuildingApt)} helperText={           
                  (errors?.employeeBuildingApt?.type) ?  errorToPropMapping[errors?.employeeBuildingApt?.type]:"" 
                }/>
              </FormControl>

              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Street Name
                </InputLabel>
                <TextField style={{ marginTop: "20px" }} defaultValue={employee.personalProfile? employee.personalProfile.currentAddress?.streetName:""} {...register("employeeStreetName", { required: true, maxLength: 120})} size="small" id="name-input" 
                 error = {!!(errors?.employeeStreetName)} helperText={           
                  (errors?.employeeStreetName?.type) ?  errorToPropMapping[errors?.employeeStreetName?.type]:"" 
                }/>
              </FormControl>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "start",
                  gap: "20px",
                }}>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                 City
                </InputLabel>
                <TextField style={{ marginTop: "20px" }} defaultValue={employee.personalProfile? employee.personalProfile.currentAddress?.city:""} {...register("employeeCity", { required: true, maxLength: 120})} size="small" id="name-input" 
                error = {!!(errors?.employeeCity)} helperText={           
                  (errors?.employeeCity?.type) ?  errorToPropMapping[errors?.employeeCity?.type]:"" 
                }/>
              </FormControl>
          
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                 State
                </InputLabel>
                <TextField style={{ marginTop: "20px" }} defaultValue={employee.personalProfile? employee.personalProfile.currentAddress?.state:""} {...register("employeeState", { required: true, maxLength: 120})} size="small" id="name-input" 
                   error = {!!(errors?.employeeState)} helperText={           
                    (errors?.employeeState?.type) ?  errorToPropMapping[errors?.employeeState?.type]:"" 
                  }/>
              </FormControl>

              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                 Zip
                </InputLabel>
                <TextField style={{ marginTop: "20px" }} defaultValue={employee.personalProfile? employee.personalProfile.currentAddress?.zip:""} {...register("employeeZip", { required: true, maxLength: 120})} size="small" id="name-input" 
                   error = {!!(errors?.employeeZip)} helperText={           
                    (errors?.employeeZip?.type) ?  errorToPropMapping[errors?.employeeZip?.type]:"" 
                  }/>
                
              </FormControl>
              </div>
              </div>
              <div style={{ borderTop:"1px solid gray", width:"100%"}}><h5  style={{margin:"10px 0"}}>Reference</h5></div>

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "start",
                gap: "20px",
              }}
            >
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  First Name
                </InputLabel>
                <TextField
                  defaultValue={
                    employee.personalProfile?.reference
                      ? employee.personalProfile.reference.firstName
                      : ""
                  }
                  style={{ marginTop: "20px" }}
                  {...register("employeeReferenceFirstName", {
                    required: true,
                    maxLength: 20,
                    pattern: /^[A-Za-z]+$/i,
                  })}
                  size="small"
                  id="name-input"
                  erro
                  error={!!errors?.employeeReferenceFirstName}
                  helperText={
                    errors?.employeeReferenceFirstName?.type
                      ? errorToPropMapping[
                          errors?.employeeReferenceFirstName?.type
                        ]
                      : ""
                  }
                />
              </FormControl>

              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Middle Name
                </InputLabel>
                <TextField
                  defaultValue={
                    employee.personalProfile?.reference
                      ? employee.personalProfile.reference.middleName
                      : ""
                  }
                  style={{ marginTop: "20px" }}
                  {...register("employeeReferenceMiddleName", {
                    maxLength: 20,
                    pattern: /^[A-Za-z]+$/i,
                  })}
                  size="small"
                  id="name-input"
                  erro
                  error={!!errors?.employeeReferenceMiddleName}
                  helperText={
                    errors?.employeeReferenceMiddleName?.type
                      ? errorToPropMapping[
                          errors?.employeeReferenceMiddleName?.type
                        ]
                      : ""
                  }
                />
              </FormControl>

              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Last Name
                </InputLabel>
                <TextField
                  defaultValue={
                    employee.personalProfile?.reference
                      ? employee.personalProfile.reference.lastName
                      : ""
                  }
                  style={{ marginTop: "20px" }}
                  {...register("employeeReferenceLastName", {
                    required: true,
                    maxLength: 20,
                    pattern: /^[A-Za-z]+$/i,
                  })}
                  size="small"
                  id="name-input"
                  erro
                  error={!!errors?.employeeReferenceLastName}
                  helperText={
                    errors?.employeeReferenceLastName?.type
                      ? errorToPropMapping[
                          errors?.employeeReferenceLastName?.type
                        ]
                      : ""
                  }
                />
              </FormControl>

              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Relationship
                </InputLabel>
                <TextField
                  defaultValue={
                    employee.personalProfile?.reference
                      ? employee.personalProfile.reference.relationship
                      : ""
                  }
                  style={{ marginTop: "20px" }}
                  {...register("employeeReferenceRelationship", {
                    required: true,
                    maxLength: 20,
                    pattern: /^[A-Za-z]+$/i,
                  })}
                  size="small"
                  id="name-input"
                  erro
                  error={!!errors?.employeeReferenceRelationship}
                  helperText={
                    errors?.employeeReferenceRelationship?.type
                      ? errorToPropMapping[
                          errors?.employeeReferenceRelationship?.type
                        ]
                      : ""
                  }
                />
              </FormControl>
             </div>
             <article style={{width:"100%" , display: (employee.applicationStatus === "Never Submitted") ? "block" : "none"}}>
             <div
                style={{
               
                  width: "100%",
                  display: "flex",
                  justifyContent: "start",
                  alignItems:"center",
                  gap: "20px",
                }}>
            

<span>What's your work Authorization in the U.S? </span>  
<Select

labelId="demo-simple-select-helper-label"
id="demo-simple-select-helper"
size="small"
defaultValue={employee.personalProfile?.workAuth ? employee.personalProfile?.workAuth?.type:"Citizen"}
style={{ marginTop: "12px" }}  {...register("employeeWorkAuth")} 
>

<MenuItem key={"Citizen"} value={"Citizen"}>
{"Citizen"}
</MenuItem>
<MenuItem key={"GreenCard"} value={"GreenCard"}>
{"GreenCard"}
</MenuItem>

<MenuItem key={"H1B"} value={"H1B"}>
{"H1B"}
</MenuItem>
<MenuItem key={"H4"} value={"H4"}>
{"H4"}
</MenuItem>
<MenuItem key={"F1(CPT/OPT)"} value={"F1(CPT/OPT)"}>
{"F1(CPT/OPT)"}
</MenuItem>

<MenuItem key={"Ohters"} value={"Others"}>
{"Others"}
</MenuItem>
</Select>
                
</div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "start",
                  gap: "20px",
                }}>
  
  {(watchemployeeWorkAuth !== "Citizen" && watchemployeeWorkAuth !== "GreenCard") ?
  (<>  <FormControl variant="standard" fullWidth>
  <InputLabel shrink htmlFor="bootstrap-input">
   Start Date:
  </InputLabel>
  <TextField
                  style={{ marginTop: "20px" }}
                  defaultValue={
                    employee.personalProfile.workAuth?.startDate
                      ? employee.personalProfile.workAuth?.startDate
                      : ""
                  }
                  {...register("employeeWorkAuthStartDate", {
                   
                    maxLength: 120,
                    pattern:
                      /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/,
                  })}
                  size="small"
                  id="name-input"
                  error={!!errors?.employeeWorkAuthStartDate}
                  helperText={
                    errors?.employeeWorkAuthStartDate?.type
                      ? errorToPropMapping[errors?.employeeWorkAuthStartDate?.type] +
                        " Example: MM/DD/YYYY"
                      : ""
                  }
                />
</FormControl>
  <FormControl variant="standard" fullWidth>
  <InputLabel shrink htmlFor="bootstrap-input">
    End Date:
  </InputLabel>
  <TextField
                  style={{ marginTop: "20px" }}
                  defaultValue={
                    employee.personalProfile.workAuth?.startEnd
                    ? employee.personalProfile.workAuth?.startEnd
                    : ""
                  }
                  {...register("employeeWorkAuthEndDate", {
                   
                    maxLength: 120,
                    pattern:
                      /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/,
                  })}
                  size="small"
                  id="name-input"
                  error={!!errors?.employeeWorkAuthEndDate}
                  helperText={
                    errors?.employeeWorkAuthEndDate?.type
                      ? errorToPropMapping[errors?.employeeWorkAuthEndDate?.type] +
                        " Example: MM/DD/YYYY"
                      : ""
                  }
                />
</FormControl></>):""}
</div> 

            {watchemployeeWorkAuth === "F1(CPT/OPT)" ?
              
              (
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Please upload your OPT receipt:
                </InputLabel>
                <FileUpload fileHandler = {setFiles} files ={employee.personalProfile.documents}/>   
              </FormControl>
              )
              :
              <></>
            }

            {watchemployeeWorkAuth === "Others" ?          
              (
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                Please specify your visa type:
                </InputLabel>
                <TextField
                  defaultValue={
                    employee.personalProfile
                      ? employee.personalProfile.visaTitle
                      : ""
                  }
                  style={{ marginTop: "20px" }}
                  {...register("employeeVisaTitle", {
                 
                    maxLength: 20,
                    pattern: /^[A-Za-z]+$/i,
                  })}
                  size="small"
                  id="name-input"
                  erro
                  error={!!errors?.employeeVisaTitle}
                  helperText={
                    errors?.employeeVisaTitle?.type
                      ? errorToPropMapping[
                          errors?.employeeVisaTitle?.type
                        ]
                      : ""
                  }
                /> 
              </FormControl>
              )
              :
              <></>
            }
       
             
              </article>
              <Button onClick={()=>{console.log("hi")}}  variant="contained" type = "submit" fullWidth>
                Submit Application
              </Button>
              
            </Box>
          </div>
        </div>
      </div>
    );

  
}
