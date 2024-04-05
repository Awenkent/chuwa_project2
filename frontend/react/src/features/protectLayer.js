import { Navigate, Link } from "react-router-dom";
import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setEmployee,
  selectEmployee,
} from "../redux/employeeSlice";

export default function ProtectLayer({ children }) {
  const employee = useSelector(selectEmployee);
  
  console.log(employee)
  if (employee.role !== "hr") {
    return <Navigate to="/signin" />;
  }

    return <div>{children}</div>;
  

}
 