import { useSelector, useDispatch } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import Navigation from "../features/navigation";
import { setEmployee, selectEmployee } from "../redux/employeeSlice";

export default function Home() {
  const employee = useSelector(selectEmployee);
  if (employee.role === "hr") {
    return <Navigate to="/hr" />;
  } else if (employee.role === "employee") {
    if (employee.applicationStatus !== "approved") {
      return <Navigate to="/application" />;
    } else {
      return <Navigate to="/profile" />;
    }
  }
  return <div>home</div>;
}
