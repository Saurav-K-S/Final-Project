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
        email: props.numberValue,
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
        if (error.response.status == 401) {
          navigate("/");
          localStorage.setItem("token", "");
        }
        console.log(error);
        setAlertMsg(error.response.data.msg);
        setShowAlert(true);
      });
  }
  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="h-[450px] w-[424px]">
        <Heading head="Login" />
        <div className="ml-[20px] font-IBM-Plex-Mono text-[17px] font-semibold">
          Forgot Password?
        </div>
        <TextField
          head="Please enter the E-Mail you used to register"
          type="text"
          func={props.numberFunc}
        />

        <SubmitButton action="Continue" func={Submit} />
        {showAlert && <Alert alertMsg={alertMsg} closeAlert={closeAlert} />}
      </div>
    </div>
  );
}
