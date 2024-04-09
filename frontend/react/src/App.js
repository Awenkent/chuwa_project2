import "./styles.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./features/home";
import Error from "./features/error";
import Signin from "./features/signin";
import ErrorBoundary from "./features/errorBoundary";
import ProtectLayer from "./features/protectLayer";
import PersonalProfile from "./features/personalProfile";
import Signup from "./features/signup";
import Application from "./features/application";
import SendRegistrationEmail from "./features/generateRegistrationEmailPage";
import RegistrationHistoryPage from "./features/registrationHistory";
import HrVisaStatusManagement from "./features/hrVisaStatusManagement"
import HrProtectLayer from "./features/hrProtectLayer"
import HiringManagementPage from "./features/hiringManagementPage";
import HrViewApplicationPage from "./features/hrViewApplicationPage";
import HrEditApplicationPage from "./features/hrEditApplicationPage";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import VisaStatus from "./features/visaStatusManagement"
import ApplicationStatus from "./features/applicationStatus"
import {
  fetchCurrentEmployee,
  setEmployee,
  selectEmployee,
} from "./redux/employeeSlice";
export default function App() {
  const employee = useSelector(selectEmployee);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrentEmployee());
  }, []);

  console.log(employee);

  return (
    <BrowserRouter>
 
     
    <div className="App" style={{ backgroundColor: "rgb(235,235,235)" }}>
     
      <div style={{minHeight: "800px"}}>
      <ErrorBoundary>
      <Routes>
        <Route path="/signin" element={<Signin />} /> 
        
        <Route path="/application" element={<Application />} />  
        <Route path="/applicationstatus" element={<ApplicationStatus />} />
        <Route path="/" element={ <ProtectLayer><Home /></ProtectLayer>} >
          <Route path="/profile" element={<PersonalProfile />} />
          <Route path="/visastatus" element={<VisaStatus />} />
          <Route path="/hr/visastatus" element={<HrProtectLayer><HrVisaStatusManagement /></HrProtectLayer>} />

        </Route>
        <Route path="/signup/:signupToken" element={<Signup />} />
        <Route path="/generateRegistrationEmail" element={<SendRegistrationEmail />} />
        <Route path="/registrationHistory" element={<RegistrationHistoryPage />} />
        <Route path="/hiringManagement" element={<HiringManagementPage />} />
        <Route path="/hrViewApplicationPage/:employeeId" element={<HrViewApplicationPage />} />
        <Route path="/hrEditApplicationPage/:employeeId" element={<HrEditApplicationPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
      </ErrorBoundary>

      </div>
    
     
    </div>
 
    </BrowserRouter>
  );
}
