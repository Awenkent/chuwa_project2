import "./styles.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./features/home";
import Error from "./features/error";
import Signin from "./features/signin";
import  ErrorBoundary from "./features/errorBoundary";
import ProtectLayer from "./features/protectLayer";
import PersonalProfile from "./features/personalProfile"
import Register from "./features/register"
import Application from "./features/application"

import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCurrentEmployee,
  setEmployee,
  selectEmployee,
} from "./redux/employeeSlice";
export default function App() {
  const employee = useSelector(selectEmployee);
  const dispatch = useDispatch();



 
  return (
    <BrowserRouter>
 
     
    <div className="App" style={{ backgroundColor: "rgb(235,235,235)" }}>
     
      <div style={{minHeight: "800px"}}>
      <ErrorBoundary>
      <Routes>
        <Route path="/signin" element={<Signin />} /> 
        
        <Route path="/application" element={<Application />} />  
        <Route path="/" element={ <ProtectLayer><Home /></ProtectLayer>} >
          
          <Route path="/profile" element={<PersonalProfile />} />

        </Route>
        <Route path="/register" element={<Register  />} />
        <Route path="*" element={<Error />} />
      </Routes>
      </ErrorBoundary>
      </div>
    
     
    </div>
 
    </BrowserRouter>
   
  );
}
