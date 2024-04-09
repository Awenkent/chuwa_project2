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

const getAllEmployee = async (parameters) => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:4000/hr/allProfiles", {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
        cache: "default",
      }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.text().then((text) => {
           throw new Error(text);
        });
      }
    });
    return response;
  }

  export default function hrVisaStatusManagement()
  {
    const employee = useSelector(selectEmployee);
    const navigate = useNavigate();
    const [employees,setEmployees] = useState([])
    console.log(employee)
    console.log(employees)
    useEffect(()=>{
        if(employee.userName === null)
        {
            navigate("/")
        }
        else
        {
            getAllEmployee().then((res)=>{setEmployees((prev) =>res)}).catch((err)=>{
                alert(err)
            })
        }
    },[])
    return(
        <>
        {employees.map((current,index)=>{
              if(current.workAuth?.type === "F1(CPT/OPT)")
              {
            return (
              
               <div key = {index} style={{display:"flex", gap:"10px"}}>
                <div>{current.firstName}{current.middleName}{current.lastName}</div>
                <div>{current.email}</div>
                <div>{current.workAuth?.type}{current.workAuth?.startDate}{current.workAuth?.endDate}</div>
                <div>{current.optState}{current.optStatus}</div>
                {current.documents?.length > 0 ?
                                        <div className="kb-attach-box">
                                            <hr />
                                            {
                                                current.documents?.map((data, index) => {
                                                    const { id, filename, filetype, fileimage, datetime, filesize } = data;
                                                    return (
                                                        <div className="file-atc-box" key={index}>
                                                            {
                                                                filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ?
                                                                    <div className="file-image"> <img src={fileimage} alt="" /></div> :
                                                                    <div className="file-image"><i className="far fa-file-alt"></i></div>
                                                            }
                                                            <div className="file-detail">
                                                                <h6>{filename}</h6>
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
                {employee.optStatus === "pending"}
                {

                    <>
                    <button>Approved</button><button>Reject</button>
                    </>
                }
                
               </div>
            )
        }
        })}
        </>
    )
  }