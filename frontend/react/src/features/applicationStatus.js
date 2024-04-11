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
import {
  setEmployee,
  selectEmployee,
  fetchEmployee,
  setEmployeeProfile,
} from "../redux/employeeSlice";
export default function applicationStatus(props) {
  const employee = useSelector(selectEmployee);
  const navigate = useNavigate();
  useEffect(() => {
    if (employee.userName === null) {
      navigate("/profile");
    }
  }, []);

  const handleEdit = () => {
    navigate("/application");
  };

  const handleSignOut = () => {
    alert("Sign Out Successfully!");
    localStorage.removeItem("token");
    window.location.replace("/");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2>Application Status</h2>
      <div
        style={{
          padding: "20px 50px",
          margin: "50px",
          backgroundColor: "white",
        }}
      >
        <div>Current Status: {employee.personalProfile?.applicationStatus}</div>
        {employee.personalProfile?.feedback ? (
          <div>Hr feedback: {employee.personalProfile?.feedback}</div>
        ) : (
          ""
        )}
        <div style={{ borderTop: "1px solid gray", width: "100%" }}>
          <h3 style={{ margin: "10px 0" }}>Personal Information</h3>
        </div>
        <div style={{ textAlign: "left" }}>
          <div>
            Employee Name: {employee.personalProfile.firstName}{" "}
            {employee.personalProfile.middleName}{" "}
            {employee.personalProfile.lastName}
          </div>
          <div>Gender: {employee.personalProfile.gender}</div>
          <div>Phone: {employee.personalProfile.cellPhoneNumber}</div>
          <div>Email: {employee.personalProfile.email}</div>
          <div>SSN: {employee.personalProfile.SSN}</div>
        </div>

        <div style={{ borderTop: "1px solid gray", width: "100%" }}>
          <h3 style={{ margin: "10px 0" }}>Address</h3>
        </div>
        <div style={{ textAlign: "left" }}>
          <div>
            Building/Apt Number :{" "}
            {employee.personalProfile.currentAddress?.buildingAptNumber}
          </div>
          <div>
            {" "}
            Street: {employee.personalProfile?.currentAddress?.streetName}{" "}
          </div>
          <div> City: {employee.personalProfile?.currentAddress?.city} </div>
          <div> State: {employee.personalProfile?.currentAddress?.state} </div>
          <div> Zip: {employee.personalProfile?.currentAddress?.zip} </div>
        </div>

        <div style={{ borderTop: "1px solid gray", width: "100%" }}>
          <h3 style={{ margin: "10px 0" }}>Reference</h3>
        </div>
        <div style={{ textAlign: "left" }}>
          <div>
            {" "}
            First Name: {employee.personalProfile?.reference?.firstName}{" "}
          </div>
          <div>
            {" "}
            Middle Name: {employee.personalProfile?.reference?.middleName}{" "}
          </div>
          <div>Last Name: {employee.personalProfile?.reference?.lastName} </div>

          <div>
            {" "}
            Relationship: {
              employee.personalProfile?.reference?.relationship
            }{" "}
          </div>
        </div>

        <div style={{ borderTop: "1px solid gray", width: "100%" }}>
          <h3 style={{ margin: "10px 0" }}>Emergency Contact</h3>
        </div>
        <div style={{ textAlign: "left" }}>
          <div>
            {" "}
            First Name: {
              employee.personalProfile?.emergencyContacts?.firstName
            }{" "}
          </div>
          <div>
            Middle Name:{" "}
            {employee.personalProfile?.emergencyContacts?.middleName}{" "}
          </div>
          <div>
            {" "}
            Last Name:{" "}
            {
              employee.personalProfile?.emergencyContacts?.lastName
            }{" "}
          </div>

          <div>
            Relationship:{" "}
            {employee.personalProfile?.emergencyContacts?.relationship}{" "}
          </div>
        </div>

        <div style={{ borderTop: "1px solid gray", width: "100%" }}>
          <h3 style={{ margin: "10px 0" }}>Documents</h3>
          {employee.personalProfile?.documents?.length > 0 ? (
            <div className="kb-attach-box">
              <hr />
              {employee.personalProfile?.documents?.map((data, index) => {
                const {
                  id,
                  filename,
                  filetype,
                  fileimage,
                  datetime,
                  filesize,
                } = data;
                return (
                  <div className="file-atc-box" key={index}>
                    {filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ? (
                      <div className="file-image">
                        {" "}
                        <img src={fileimage} alt="" />
                      </div>
                    ) : (
                      <div className="file-image">
                        <i className="far fa-file-alt"></i>
                      </div>
                    )}
                    <div className="file-detail">
                      <h6>
                        {filename}({data.status})
                      </h6>
                      <p>
                        <span>Size : {filesize}</span>
                        <span className="ml-3">Modified Time : {datetime}</span>
                      </p>
                      <div className="file-actions">
                        <a
                          href={fileimage}
                          className="file-action-btn"
                          download={filename}
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div
        style={{ display: "flex", gap: "30px", justifyContent: "space-around" }}
      >
        {employee.applicationStatus === "Rejected" ? (
          <button
            style={{
              height: "50px",
              width: "150px",
              backgroundColor: "rgb(25,118,210)",
              cursor: "pointer",
              color: "white",
            }}
            onClick={handleEdit}
          >
            Edit Application
          </button>
        ) : (
          ""
        )}
        <button
          style={{
            height: "50px",
            width: "150px",
            backgroundColor: "rgb(25,118,210)",
            color: "white",
            cursor: "pointer",
          }}
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
