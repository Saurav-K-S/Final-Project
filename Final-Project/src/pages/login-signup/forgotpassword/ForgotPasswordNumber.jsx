import React, { useState } from "react";
import Heading from "../../../components/Heading";
import TextField from "../../../components/TextField";
import SubmitButton from "../../../components/SubmitButton";
import Alert from "../../../components/Alert";
import axios from "axios";

export default function ForgotPasswordNumber(props) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  function Submit() {
    axios
      .post("https://ancestree-backend.onrender.com/api/v1/user/forgot", {
        mobileNumber: Number(props.numberValue),
      })
      .then(function (response) {
        console.log(response);
        if (response.data.success) {
          props.otpOGFunc(response.data.otp);
          props.indexFunc(1);
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
  }
  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[424px] h-[450px]">
        <Heading head="Login" />
        <div className="ml-[20px] font-IBM-Plex-Mono text-[17px] font-semibold">
          Forgot Password?
        </div>
        <TextField
          head="Please enter the phone number you used to register"
          type="text"
          func={props.numberFunc}
        />

        <SubmitButton action="Continue" func={Submit} />
        {showAlert && <Alert alertMsg={alertMsg} closeAlert={closeAlert} />}
      </div>
    </div>
  );
}
