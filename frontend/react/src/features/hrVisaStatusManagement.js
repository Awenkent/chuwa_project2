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

    selectEmployee,
  } from "../redux/employeeSlice";
  

  const updateEmployee = async (employee) => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:4000/HR/profile", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(employee),
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
    const feedbackRef = useRef([]);
    console.log(employee)
    const handleOnChange=(e,index) =>
    {
  
        feedbackRef.current[index] = e.target.value
    }
    const handleApprove = (current,index)=>{
     
      switch(current.optStage)
      {
          case "RECEIPT":
          {
              current.optStage = "EAD";
              current.optStatus = "Never submitted"
              current.nextStep = "Please submit your EAD file"
              break;
          }
           case "EAD":
          {
              current.optStage = "I-983";
              current.optStatus = "Never submitted"
  
              current.nextStep = "Please submit your I-983 file"
              break;
          }
          case "I-983":
          {
              current.optStage = "I-20";
              current.optStatus = "Never submitted"
  
              current.nextStep = "Please submit your I-20 file"
              
              break;
          }
          case "I-20":
          {
              current.optStatus = "Approved"
              current.nextStep= "none"
              break;
          }
          
      }
      current.documents.forEach(document => {
          document.status = "Approved"
      });

      current.feedback = feedbackRef.current[index]
      console.log(current)
      updateEmployee(current).then(()=>{
        getAllEmployee().then((res)=>{setEmployees((prev) =>res)}).catch((err)=>{
            alert(err)
        })

      }).catch((err)=>{
        alert(err)
      })
  }
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
        <div style={{maxWidth:"800px", margin:"0 auto"}}>
        <h2>{location.state ?"Update Product" : "Create Product"}</h2>
        <div
          style={{
            padding: "20px 50px",
            margin: "50px",
            backgroundColor: "white",
          }}
        >
        {employees.map((current,index)=>{
              if(current.workAuth?.type === "F1(CPT/OPT)")
              {
            return (
                <>
               <div key = {index} style={{textAlign:"left"}}>
                <div>Employee: {current.firstName} {current.middleName} {current.lastName}</div>
                <div>Email: {current.email}</div>
                <div>Work Authorization:{current.workAuth?.type} Start Date: {current.workAuth?.startDate} End Date:{current.workAuth?.endDate}</div>
                <div>OPT Status:{current.optStage} {current.optStatus}</div>
                </div>
                <details >
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
                {current.optStatus === "Pending"? 
                (
                    
                    <div style={{marginTop:"10px", display:"flex", gap:"10px", justifyContent:"center"}}>
                     HR FeedBack: 
                    <input onChange={(e)=>
                        {
                        
                            handleOnChange(e,index)
                        
                        }}></input>
                    <button onClick={()=>handleApprove(current,index)}>Approved</button><button onClick={()=>handleReject(current,index)}>Reject</button>
                    </div>
                ):""
                }
                </details>
                <div style={{marginTop:"10px", borderBottom : "1px solid gray"}}></div>
                </>
             
            )
        }
        })}
        </div>
        </div>
        
    )
  }