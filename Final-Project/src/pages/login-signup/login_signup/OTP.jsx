import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";

import Heading from "../../../components/Heading";
import SubmitButton from "../../../components/SubmitButton";
import Alert from "../../../components/Alert";
import axios from "axios";

export default function OTP(props) {
  const [otp, setOtp] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const navigate = useNavigate();

  function Register() {
    if (props.otpOGVal == otp) {
      axios
        .post("https://ancestree-backend.onrender.com/api/v1/user/create", {
          mobileNumber: Number(props.numberValue),
          email: props.emailValue,
          name: props.nameValue,
          password: props.passwordValue,
        })
        .then(function (response) {
          console.log(response);
          if (response.data.success) {
            props.indexFunc(3)
          } else {
            setAlertMsg(response.data.msg);
            setShowAlert(true);
          }
        })
        .catch(function (error) {
          console.log(error);
          setAlertMsg(error.response.data.msg);
          setShowAlert(true);
        });
    } else {
      setAlertMsg("Invalid OTP! Click to go back to Sign In"),
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
