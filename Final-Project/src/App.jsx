
import Login from "./pages/login-signup/login_signup/Login"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from "./pages/login-signup/login_signup/SignUp";
import BasePage from "./pages/basepage/BasePage";
import ForgotPassword from "./pages/login-signup/forgotpassword/ForgotPassword";
import FamilyJoinCreation from "./pages/family-join-creation/FamilyJoinCreation";
import UploadPhotoOG from "./pages/family-join-creation/UploadPhotoOG";
import Onboarding from "./onboarding/Onboarding";
import Photos from "./pages/album/Photos";


function App() {

  return (

    <Router>
      <Routes>
        <Route path="/basepage" element={<BasePage/>} />   
        <Route path="/familyjoincreation" element={<FamilyJoinCreation/>} />   
        <Route path="/upload" element={<UploadPhotoOG/>} />   
        <Route path="/forgotpassword" element={<ForgotPassword/>} /> 
        <Route path="/" element={<Onboarding/>} /> 
        <Route path="/photos/:id" element={<Photos/>} /> 
        <Route path="/login" element={<Login newUser={false}/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </Router>

  )
}

export default App
