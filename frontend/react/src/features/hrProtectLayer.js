import { Navigate, Link } from "react-router-dom";
import { useEffect,useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  setEmployee,
  selectEmployee,
  fetchCurrentEmployee,
} from "../redux/employeeSlice";
export default function HrProtectLayer({ children }) {
  const employee = useSelector(selectEmployee);
  const dispatch = useDispatch();

  console.log(employee)
  if (employee.role !== "hr") {
    return <Navigate to="/" />;
  }
    return <div>{children}</div>;
}
