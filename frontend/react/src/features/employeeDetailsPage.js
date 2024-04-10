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
export default function personalProfile(props) {
  const location = useLocation();
  const [editMode, setEditMode] = useState(false);
  // const employee = useSelector(selectEmployee);

  if (!editMode)
    return (
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h2>Personel Information</h2>
        <div
          style={{
            padding: "20px 50px",
            margin: "50px",
            backgroundColor: "white",
          }}
        >
          <Button
            onClick={() => {
              setEditMode(true);
            }}
          >
            Edit
          </Button>

          <div style={{ borderTop: "1px solid gray", width: "100%" }}>
            <h3 style={{ margin: "10px 0" }}>Personal Information</h3>
          </div>
          <div style={{ textAlign: "left" }}>
            <div>
              Employee Name: {location.state.firstName}{" "}
              {location.state.middleName} {location.state.lastName}
            </div>
            <div>Gender: {location.state.gender}</div>
            <div>Phone: {location.state.cellPhoneNumber}</div>
            <div>Email: {location.state.email}</div>
            <div>SSN: {location.state.SSN}</div>
          </div>

          <div style={{ borderTop: "1px solid gray", width: "100%" }}>
            <h3 style={{ margin: "10px 0" }}>Address</h3>
          </div>
          <div style={{ textAlign: "left" }}>
            <div>
              Building/Apt Number :{" "}
              {location.state.currentAddress?.buildingAptNumber}
            </div>
            <div> Street: {location.state?.currentAddress?.streetName} </div>
            <div> City: {location.state?.currentAddress?.city} </div>
            <div> State: {location.state?.currentAddress?.state} </div>
            <div> Zip: {location.state?.currentAddress?.zip} </div>
          </div>

          <div style={{ borderTop: "1px solid gray", width: "100%" }}>
            <h3 style={{ margin: "10px 0" }}>Reference</h3>
          </div>
          <div style={{ textAlign: "left" }}>
            <div>
              {" "}
              Reference First Name: {location.state?.reference?.firstName}{" "}
            </div>
            <div>
              {" "}
              Reference Middle Name: {
                location.state?.reference?.middleName
              }{" "}
            </div>
            <div>
              {" "}
              Reference Last Name: {location.state?.reference?.lastName}{" "}
            </div>

            <div>
              {" "}
              Reference Relationship: {
                location.state?.reference?.relationship
              }{" "}
            </div>
          </div>

          <div style={{ borderTop: "1px solid gray", width: "100%" }}>
            <h3 style={{ margin: "10px 0" }}>Documents</h3>
            {location.state?.documents?.length > 0 ? (
              <div className="kb-attach-box">
                <hr />
                {location.state?.documents?.map((data, index) => {
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
                          <span className="ml-3">
                            Modified Time : {datetime}
                          </span>
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
      </div>
    );
  else {
    return (
      <>
        <Button
          onClick={() => {
            if (window.confirm("Are you sure want discard all changes?")) {
              setEditMode(false);
            }
          }}
        >
          Exit
        </Button>
        <Application />
      </>
    );
  }
}
