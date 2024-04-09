import React, { useState } from "react";
import OTPInput from "react-otp-input";

import Heading from "../../../components/Heading";
import SubmitButton from "../../../components/SubmitButton";
import Alert from "../../../components/Alert";

export default function ForgotPasswordOTP(props) {
  const [otp, setOtp] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  function Register() {
    if (props.otpOGVal == otp) {
      props.indexFunc(2);
    } else {
      setAlertMsg("Invalid OTP! Click to go back to Forgot Password Screen"),
        setShowAlert(true);
    }
  }
  const closeAlert = () => {
    setShowAlert(false);
    props.indexFunc(0);
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[424px] h-[450px]">
        <Heading head="SignUp" />
        <div className="ml-[70px] mt-8 font-IBM-Plex-Mono text-[17px] font-semibold">
          OTP Verification
        </div>
        <div className="ml-[70px] w-[425px] text-[14px] font-IBM-Plex-Mono">
          Please enter the OTP sent to your mobile number
        </div>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          renderSeparator={<div className="w-[15px]"></div>}
          renderInput={(props) => <input {...props} />}
          containerStyle={{
            marginLeft: "70px",
            marginTop: "20px",
          }}
          inputStyle={{
            width: "65px",
            height: "65px",
            backgroundColor: "#FEFFDD",
            borderWidth: "0.6px",
            borderColor: "black",
            borderStyle: "dashed",
            borderRadius: "18px",
          }}
        />
        <div className="ml-[50px] mt-10">
          <SubmitButton action="Continue" func={Register} />
        </div>
        {showAlert && <Alert alertMsg={alertMsg} closeAlert={closeAlert} />}
      </div>
    </div>
  );
}
