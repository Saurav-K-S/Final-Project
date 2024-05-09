import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Heading from "../../../components/Heading";
import TextField from "../../../components/TextField";
import SubmitButton from "../../../components/SubmitButton";
import axios from "axios";
import Alert from "../../../components/Alert";
import gsap from "gsap";

export default function Login(props) {
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");

  const passwordInputRef = useRef(null);
  const phoneInputRef = useRef(null);

  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  useEffect(() => {
    gsap.fromTo(
      ".login",
      {
        opacity: 0,
      },
      { opacity: 1, duration: 2 }
    );
  }, []);

  function Submit() {
    axios
      .post("https://ancestree-backend.onrender.com/api/v1/user/login", {
        mobileNumber: phonenumber,
        password: password,
      })
      .then(function (response) {
        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          if (props.newUser) {
            navigate("/familyjoincreation");
          } else {
            navigate("/basepage");
          }
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
        passwordInputRef.current.value = "";
        phoneInputRef.current.value = "";
      });
  }
  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="login h-[550px] w-[410px]">
        <Heading head="Login" />

        <TextField
          head="Phone number"
          type="number"
          func={setPhonenumber}
          inputRef={phoneInputRef}
        />
        <TextField
          head="Password"
          type="password"
          func={setPassword}
          inputRef={passwordInputRef}
        />

        <div className=" mt-[5px] flex justify-end font-IBM-Plex-Mono text-[13px] text-[#6A6A6A]">
          <Link to="/forgotpassword">Forgot password</Link>
        </div>

        <SubmitButton action="Login" func={Submit} />

        {showAlert && <Alert alertMsg={alertMsg} closeAlert={closeAlert} />}
      </div>
    </div>
  );
}
