import React, { useState } from "react";
import Heading from "../../../components/Heading";
import TextField from "../../../components/TextField";
import SubmitButton from "../../../components/SubmitButton";
import axios from "axios";

export default function SignUpNumber(props) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  function Submit() {
    console.log("HIIII")
    axios
      .post("https://ancestree-backend.onrender.com/api/v1/user/register", {
        email: props.emailValue,
      })
      .then(function (response) {
        console.log(response);
        if (response.data.success) {
          props.otpFunc(response.data.otp);
          props.indexFunc(2);
        } else {
          setAlertMsg(response.data.msg+" Click to go back to Sign In" );
          setShowAlert(true);
        }
      })
      .catch(function (error) {
        console.log(error);
        setAlertMsg(error.response.data.msg+" Click to go back to Sign In");
        setShowAlert(true);
      });
  }
  const closeAlert = () => {
    setShowAlert(false);
    props.indexFunc(0);

  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[410px] h-[450px]">
        <Heading head="SignUp" />
        <div className="ml-[20px] font-IBM-Plex-Mono text-[17px] font-semibold">
          OTP Verification
        </div>
        <TextField head="Email" func={props.emailFunc} />
        <SubmitButton action="Continue" func={Submit} />
        {showAlert && <Alert alertMsg={alertMsg} closeAlert={closeAlert} />}
      </div>
    </div>
  );
}
