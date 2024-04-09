import React from "react";
import { useEffect } from "react";
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
  setEmployee,
  selectAllEmployees,
  fetchAllEmployees,
  setEmployeeProfile,
  updateEmployee,
} from "../redux/employeeSlice";
import Application from "./application";

export default function HiringManagementPage() {
  const navigate = useNavigate();
  const employees = useSelector(selectAllEmployees);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, []);

  console.log("All employees: \n");
  console.table(employees);
  const handlePendingApplication = (employeeId) => {
    navigate(`/hrViewApplicationPage/${employeeId}`);
  };
  const handleApplication = (employeeId) => {
    navigate(`/hrViewApplicationPage/${employeeId}`);
  };
  if (!employees) {
    return <div>Loading...</div>; // Render loading state while employees are being fetched
  }
  return (
    <div>
      <h1>Hiring Management</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2 style={{ alignSelf: "flex-start", marginBottom: "10px" }}>
          Registration
        </h2>
        <div style={{ alignSelf: "flex-start" }}>
          <button
            style={{
              backgroundColor: "rgb(80,72,229)",
              padding: "20px",
              margin: "30px",
              color: "white",
            }}
            onClick={() => navigate("/generateRegistrationEmail")}
          >
            Generate token and send email
          </button>
          <button
            style={{
              backgroundColor: "rgb(80,72,229)",
              padding: "20px",
              margin: "30px",
              color: "white",
            }}
            onClick={() => navigate("/registrationHistory")}
          >
            View Registration History
          </button>
        </div>

        <h2 style={{ alignSelf: "flex-start", marginBottom: "10px" }}>
          Onboarding Application Review
        </h2>
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
                    <TableRow key={employee.id}>
                      <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>
                        <button
                          style={{
                            backgroundColor: "rgb(80,72,229)",
                            padding: "5px",
                            margin: "5px",
                            color: "white",
                          }}
                          onClick={() => handlePendingApplication(employee._id)}
                        >
                          View Application
                        </button>
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
                    <TableRow key={employee.id}>
                      <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>
                        <button
                          style={{
                            backgroundColor: "rgb(80,72,229)",
                            padding: "5px",
                            margin: "5px",
                            color: "white",
                          }}
                          onClick={() => handleApplication(employee._id)}
                        >
                          View Application
                        </button>
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
                        <button
                          style={{
                            backgroundColor: "rgb(80,72,229)",
                            padding: "5px",
                            color: "white",
                          }}
                          onClick={() => handleApplication(employee.id)}
                        >
                          View Application
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
