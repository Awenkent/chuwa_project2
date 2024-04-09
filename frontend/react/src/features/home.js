import { useSelector, useDispatch } from "react-redux";
import { Navigate, Link } from "react-router-dom";

import { Outlet } from 'react-router-dom'
import Navigation from "../features/navigation"
import {
  setEmployee,
  selectEmployee,
} from "../redux/employeeSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Home()
{
  const navigate = useNavigate();
    const employee = useSelector(selectEmployee);
    console.log(employee)
    console.log(employee.
      applicationStatus)
    useEffect(()=>{
      if(employee.applicationStatus !== "Approved")
      {
        if(employee.applicationStatus === "Never Submitted")
        {
        
          navigate("/application");  
        }
        else
        {
      
          navigate("/applicationstatus");  
        }
      }
    })

   
    return (
      <div>
      <Navigation/>
      
      <Outlet />
      </div>
    )
  
}


