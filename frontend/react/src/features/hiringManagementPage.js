import React from "react";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import {
  selectEmployee,
  setEmployee,
  selectAllEmployees,
  fetchAllEmployees,
  setEmployeeProfile,
  updateEmployee,
} from "../redux/employeeSlice";
import Application from "./application";
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
export default function HiringManagementPage() {
  const navigate = useNavigate();
  const employee = useSelector(selectEmployee);
  const dispatch = useDispatch();
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    if (employee.userName === null) {
      navigate("/");
    } else {
      getAllEmployee()
        .then((res) => {
          setEmployees((prev) => res);
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, []);

  console.log("All employees: \n");
  console.table(employees);
  const handlePendingApplication = (employeeId) => {
    navigate(`/hrEditApplicationPage/${employeeId}`);
  };
  const handleApplication = (employeeId) => {
    navigate(`/hrViewApplicationPage/${employeeId}`);
  };
  if (!employees) {
    return <div>Loading...</div>; // Render loading state while employees are being fetched
  }
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2>Hiring Management</h2>
      <div
        style={{
          padding: "20px 50px",
          margin: "50px",
          backgroundColor: "white",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3 style={{ alignSelf: "flex-start", marginBottom: "10px" }}>
            Registration
          </h3>
          <div style={{ alignSelf: "flex-start" }}>
            <Button
              style={{
                backgroundColor: "rgb(25,118,210)",
                padding: "5px",
                margin: "5px",
                color: "white",
              }}
              onClick={() => navigate("/generateRegistrationEmail")}
            >
              Generate token and send email
            </Button>
            <Button
              style={{
                backgroundColor: "rgb(25,118,210)",
                padding: "5px",
                margin: "5px",
                color: "white",
              }}
              onClick={() => navigate("/registrationHistory")}
            >
              View Registration History
            </Button>
          </div>

          <h3 style={{ alignSelf: "flex-start", marginBottom: "10px" }}>
            Onboarding Application Review
          </h3>
          <div>
            <h3 style={{ alignSelf: "flex-start", marginBottom: "5px" }}>
              Pending
            </h3>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Application</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees
                    .filter(
                      (employee) => employee.applicationStatus === "Pending"
                    )
                    .map((employee) => (
                      <TableRow key={employee._id}>
                        <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
                        <TableCell>{employee.email}</TableCell>
                        <TableCell>
                          <Button
                            style={{
                              backgroundColor: "rgb(25,118,210)",
                              padding: "5px",
                              margin: "5px",
                              color: "white",
                            }}
                            onClick={() =>
                              handlePendingApplication(employee._id)
                            }
                          >
                            View Application
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <h3 style={{ alignSelf: "flex-start", marginBottom: "5px" }}>
              Rejected
            </h3>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Application</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees
                    .filter(
                      (employee) => employee.applicationStatus === "Rejected"
                    )
                    .map((employee) => (
                      <TableRow key={employee._id}>
                        <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
                        <TableCell>{employee.email}</TableCell>
                        <TableCell>
                          <Button
                            style={{
                              backgroundColor: "rgb(25,118,210)",
                              padding: "5px",
                              margin: "5px",
                              color: "white",
                            }}
                            onClick={() => handleApplication(employee._id)}
                          >
                            View Application
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <h3 style={{ alignSelf: "flex-start", marginBottom: "5px" }}>
              Approved
            </h3>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Application</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees
                    .filter(
                      (employee) => employee.applicationStatus === "Approved"
                    )
                    .map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
                        <TableCell>{employee.email}</TableCell>
                        <TableCell>
                          <Button
                            style={{
                              backgroundColor: "rgb(25,118,210)",
                              padding: "5px",
                              margin: "5px",
                              color: "white",
                            }}
                            onClick={() => handleApplication(employee._id)}
                          >
                            View Application
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
