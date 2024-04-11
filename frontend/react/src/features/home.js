import { useSelector, useDispatch } from "react-redux";
import { Navigate, Link } from "react-router-dom";

import { Outlet } from "react-router-dom";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import { setEmployee, selectEmployee } from "../redux/employeeSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
  const employee = useSelector(selectEmployee);
  console.log(employee);
  console.log(employee.applicationStatus);
  useEffect(() => {
    if (employee.applicationStatus !== "Approved") {
      // navigate("/application");
      if (employee.applicationStatus === "Never Submitted") {
        navigate("/application");
      } else {
        navigate("/applicationstatus");
      }
    }
  });

  return (
    <>
      <Navigation />
      <div style={{ minHeight: "800px" }}>
        <Outlet />
      </div>
      <Footer style={{ position: "fixed", bottom: "25px" }} />
    </>
  );
}
