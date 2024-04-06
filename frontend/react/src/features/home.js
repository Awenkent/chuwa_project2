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
    if(employee.applicationStatus !== "approved")
    {
        return <Navigate to="/application" />;
    }
    return (
      <div style={{backgroundImage: 'url()'}}>
      <Navigation/>
      
      <Outlet />
      </div>
    )
  
}


