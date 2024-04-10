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
  const token = localStorage.getItem("token");
  console.log(employee)
  if (employee.userName === null) {
    if(token)
    {
      dispatch(fetchCurrentEmployee()).then(()=>{
      
        return <div>{children}</div>;
      }).catch((error)=>{
        alert(error)
        return <Navigate to="/signin" />;
      })
    }
    else
    {
      return <Navigate to="/signin" />;
    }
    
  }
  else
  {
    return <div>{children}</div>;
  }
   
}
