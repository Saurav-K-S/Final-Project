import React, { useState } from "react";
import TextField from "../../../components/TextField";
import PasswordChecklist from "react-password-checklist";
import SubmitButton from "../../../components/SubmitButton";
import Heading from "../../../components/Heading";
import axios from "axios";
import Alert from "../../../components/Alert";
import { useNavigate } from "react-router-dom";
export default function ChangePassword(props) {
  var psswdcheck = false;
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  function Submit() {
    if (psswdcheck) {
      axios
        .post(
          "https://ancestree-backend.onrender.com/api/v1/user/changepassword",
          {
            mobileNumber: Number(props.numberValue),
            password: password,
          }
        )
        .then(function (response) {
          console.log(response);
          if (response.data.success) {
            navigate("/login");
          } else {
            setAlertMsg(
              response.data.msg + " Click to go back to Entering1 Number"
            );
            setShowAlert(true);
          }
        })
        .catch(function (error) {
          console.log(error);
          setAlertMsg(
            error.response.data.msg + " Click to go back to Entering2 Number"
          );
          setShowAlert(true);
        });
    } else {
      setAlertMsg("Invalid Values! Click to go back to Entering3 Number"),
        setShowAlert(true);
    }
  }
  const closeAlert = () => {
    setShowAlert(false);
    props.indexFunc(0);
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[424px] h-[550px]">
        <Heading head="Login" />
        <div className="ml-[20px] font-IBM-Plex-Mono text-[17px] font-semibold">
          Forgot Password?
        </div>
        <TextField head="Choose Password" type="password" func={setPassword} />
        <TextField
          head="Confirm Password"
          type="password"
          func={setPasswordAgain}
        />
        <PasswordChecklist
          className="text-[12px]"
          rules={["minLength", "number", "match"]}
          minLength={6}
          value={password}
          valueAgain={passwordAgain}
          onChange={(isValid) => {
            psswdcheck = isValid;
          }}
          iconSize={15}
          invalidColor="#520000"
          validColor="#FFDC5F"
        />

        <SubmitButton action="Continue" func={Submit} />
        {showAlert && <Alert alertMsg={alertMsg} closeAlert={closeAlert} />}
      </div>
    </div>
  );
}
