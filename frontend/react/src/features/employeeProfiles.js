import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { selectEmployee, selectEmployees } from "../redux/employeeSlice";
import { fetchAllEmployees } from "../redux/employeeSlice";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function EmployeeProfiles(props) {
  const navigate = useNavigate();
  const employee = useSelector(selectEmployee);
  const [employees, setEmployees] = useState([]);
  const [sorted, setSorted] = useState(false);
  console.log("render");

  const getAllEmployee = async () => {
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

  const handleEmployeeDetails = (employee) => {
    navigate(`/employees/${employee._id}`, {
      state: employee,
    });
    console.log("handleEmployeeDetail()");
    console.log(employee);
  };

  const handleSort = (e) => {
    setSorted((sorted) => !sorted);
    let newEmployees = [];
    if (sorted) {
      newEmployees = [...employees].sort((a, b) => {
        return a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase());
      });
    } else {
      newEmployees = [...employees].sort((a, b) => {
        return b.lastName.toLowerCase().localeCompare(a.lastName.toLowerCase());
      });
    }
    setEmployees(newEmployees);
    console.log(newEmployees);
  };

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

  return (
    <div>
      <TableContainer
        component={Paper}
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          position: "relative",
          minHeight: "90vh",
        }}
      >
        <h2 style={{ margin: "20px auto" }}>Employees</h2>
        <div style={{ borderTop: "1px solid gray", width: "100%" }}></div>
        <div>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell
                  onClick={handleSort}
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    fontWeight: "bold",
                  }}
                >
                  Full Name
                </StyledTableCell>
                <StyledTableCell align="right" style={{ fontWeight: "bold" }}>
                  SSN
                </StyledTableCell>
                <StyledTableCell align="right" style={{ fontWeight: "bold" }}>
                  Work Authorization Title
                </StyledTableCell>
                <StyledTableCell align="right" style={{ fontWeight: "bold" }}>
                  Phone Number
                </StyledTableCell>
                <StyledTableCell align="right" style={{ fontWeight: "bold" }}>
                  Email
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees
                ? employees.map((employee, index) => (
                    <StyledTableRow
                      style={{ cursor: "pointer" }}
                      key={index}
                      onClick={() => handleEmployeeDetails(employee)}
                    >
                      <StyledTableCell component="th" scope="row">
                        {employee.firstName && employee.lastName
                          ? employee.firstName + " " + employee.lastName
                          : "Not provided"}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {employee.SSN ? employee.SSN : "Not provided"}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {employee.workAuth
                          ? employee.workAuth.type
                          : "Not provided"}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {employee.cellPhoneNumber
                          ? employee.cellPhoneNumber
                          : "Not provided"}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {employee.email ? employee.email : "Not provided"}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                : ""}
            </TableBody>
          </Table>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            right: "40px",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          Total: {employees.length}
        </div>
      </TableContainer>
    </div>
  );
}
