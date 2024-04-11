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

import { useSelector, useDispatch } from "react-redux";

import { useParams } from "react-router-dom";
import { selectAllEmployees, fetchAllEmployees } from "../redux/employeeSlice";

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
};

export default function hrViewApplicationPage(props) {
  let { employeeId } = useParams();

  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    getAllEmployee()
      .then((res) => {
        setEmployees((prev) => res);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const employeeArr = employees.filter(
    (employee) => employee._id === employeeId
  );
  const employee = employeeArr.length > 0 ? employeeArr[0] : null;
  console.log("All employees:");
  console.log(employees);
  console.log("In hrViewApplicationPage:");
  console.log(employee);
  if (!employee) {
    return <div>Loading...</div>; // Render loading state while employees are being fetched
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2>Personal Information</h2>
      <div
        style={{
          padding: "20px 50px",
          margin: "50px",
          backgroundColor: "white",
        }}
      >
        <div style={{ borderTop: "1px solid gray", width: "100%" }}>
          <h3 style={{ margin: "10px 0" }}>Personal Information</h3>
        </div>
        <div style={{ textAlign: "left" }}>
          <div>
            Employee Name: {employee.firstName} {employee.middleName}{" "}
            {employee.lastName}
          </div>
          <div>Gender: {employee.gender}</div>
          <div>Phone: {employee.cellPhoneNumber}</div>
          <div>Email: {employee.email}</div>
          <div>SSN: {employee.SSN}</div>
        </div>

        <div style={{ borderTop: "1px solid gray", width: "100%" }}>
          <h3 style={{ margin: "10px 0" }}>Address</h3>
        </div>
        <div style={{ textAlign: "left" }}>
          <div>
            Building/Apt Number : {employee.currentAddress?.buildingAptNumber}
          </div>
          <div> Street: {employee.currentAddress?.streetName} </div>
          <div> City: {employee.currentAddress?.city} </div>
          <div> State: {employee.currentAddress?.state} </div>
          <div> Zip: {employee.currentAddress?.zip} </div>
        </div>

        <div style={{ borderTop: "1px solid gray", width: "100%" }}>
          <h3 style={{ margin: "10px 0" }}>Reference</h3>
        </div>
        <div style={{ textAlign: "left" }}>
          <div> Reference First Name: {employee.reference?.firstName} </div>
          <div> Reference Middle Name: {employee.reference?.middleName} </div>
          <div> Reference Last Name: {employee.reference?.lastName} </div>

          <div>Reference Relationship: {employee.reference?.relationship}</div>
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
            {employee.personalProfile?.reference?.emergencyContacts?.middleName}{" "}
          </div>
          <div>
            {" "}
            Last Name:{" "}
            {
              employee.personalProfile?.reference?.emergencyContacts?.lastName
            }{" "}
          </div>

          <div>
            Relationship:{" "}
            {employee.personalProfile?.emergencyContacts?.relationship}{" "}
          </div>
        </div>
        <div style={{ borderTop: "1px solid gray", width: "100%" }}>
          <h3 style={{ margin: "10px 0" }}>Documents</h3>
          {employee.documents?.length > 0 ? (
            <div className="kb-attach-box">
              <hr />
              {employee.documents?.map((data, index) => {
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
                      <h6>{filename}</h6>
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
    </div>
  );
}
