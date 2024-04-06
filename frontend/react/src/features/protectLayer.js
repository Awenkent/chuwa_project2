import { Navigate, Link } from "react-router-dom";
import { useEffect,useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  setEmployee,
  selectEmployee,
  fetchCurrentEmployee,
} from "../redux/employeeSlice";
export default function ProtectLayer({ children }) {
  const employee = useSelector(selectEmployee);
  const dispatch = useDispatch();

  console.log(employee)
  if (employee.employeeName === null) {
    return <Navigate to="/signin" />;
  }
    return <div>{children}</div>;
  

}
