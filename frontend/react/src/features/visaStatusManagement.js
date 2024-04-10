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
    fetchEmployee,
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
const TextareaAutosize = styled(BaseTextareaAutosize)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
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
export default function visaStatus(props) {
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
  
  const [files,setFiles] = useState([]);

  
 

  const matches = useMediaQuery("(min-width:600px)");
  useEffect(() => {
    if (employee.employeeName === null) {
      // dispatch(fetchEmployee());
    }
  }, []);

 const onSubmit = () => {
console.log(files)
  let allFiles = [...employee.personalProfile?.documents,...files]

  let obj =
  {
    documents:allFiles,
    optStatus:"Pending",
    nextSteps: "Wait for HR to approve " + employee.personalProfile.optStage
  }
  
  console.log(obj)
  dispatch(updateEmployee(obj)).then(()=>{
    alert("Update Successful!")
    navigate("/profile")})
 
}
    if(employee.personalProfile?.workAuth?.type !== "F1(CPT/OPT)" || employee.personalProfile?.optStatus ==="Approved")
    {
      return <div>No action required</div>
    }
    else
    {
    return (
      <div style={{maxWidth:"800px", margin:"0 auto"}}>
        <h2>Visa Status</h2>
        <div
          style={{
            padding: "20px 50px",
            margin: "50px",
            backgroundColor: "white",
          }}
        >
       
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
              {employee.personalProfile?.documents?.length > 0 ?
                                        <div className="kb-attach-box">
                                            <hr />
                                            {
                                                employee.personalProfile?.documents?.map((data, index) => {
                                                    const { id, filename, filetype, fileimage, datetime, filesize } = data;
                                                    return (
                                                        <div className="file-atc-box" key={index}>
                                                            {
                                                                filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ?
                                                                    <div className="file-image"> <img src={fileimage} alt="" /></div> :
                                                                    <div className="file-image"><i className="far fa-file-alt"></i></div>
                                                            }
                                                            <div className="file-detail">
                                                                <h6>{filename}({data.status})</h6>
                                                                <p><span>Size : {filesize}</span><span className="ml-3">Modified Time : {datetime}</span></p>
                                                                <div className="file-actions">
                      
                                                                    <a href={fileimage}  className="file-action-btn" download={filename}>Download</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        : ''}
           <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                Next Step: {employee.personalProfile?.nextSteps}
                </InputLabel>
                {employee.personalProfile.optStatus === "Never Submitted" ? <FileUpload fileHandler = {setFiles}/> : ""}
                 
              </FormControl>
              {employee.personalProfile.optStatus === "Never Submitted" ? 
           <Button variant="contained" type = "submit" fullWidth>
                Submit Application
              </Button>  
    :""}
           </Box>
        </div>
      </div>
    );
  }
 
}
