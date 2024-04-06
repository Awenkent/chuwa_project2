import { useSelector, useDispatch } from "react-redux";
import { Navigate, Link } from "react-router-dom";

import { Outlet } from 'react-router-dom'
import Navigation from "../features/navigation"
import {
  setEmployee,
  selectEmployee,
} from "../redux/employeeSlice";


export default function Home()
{
    const employee = useSelector(selectEmployee);
    console.log(employee)
    console.log(employee.
      applicationStatus)
    
    if(employee.applicationStatus !== "Approved")
    {
        return <Navigate to="/application" />;
    }
    return (
      <div>
      <Navigation/>
      
      <Outlet />
      </div>
    )
  
}


