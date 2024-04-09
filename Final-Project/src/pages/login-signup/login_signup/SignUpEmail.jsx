import React, { useEffect, useRef, useState } from "react";
import Heading from "../../../components/Heading";
import TextField from "../../../components/TextField";
import SubmitButton from "../../../components/SubmitButton";
import PasswordChecklist from "react-password-checklist";
import Alert from "../../../components/Alert";
import gsap from "gsap";

var psswdcheck = false;

export default function SignUpEmail(props) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const [passwordAgain, setPasswordAgain] = useState("");


  const nameInputRef = useRef(null);
  const numberInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const passwordAgainInputRef = useRef(null);
  useEffect(() => {
    
    gsap.fromTo(".signup",{
      opacity:0,

    },{opacity:1,duration:2})
  }, []);
  function Continue() {
    if (psswdcheck) {
      localStorage.setItem('name', props.name)
      props.indexFunc(1);
    } else {
      setAlertMsg("Invalid Password!"), setShowAlert(true);
      nameInputRef.current.value = "";
      numberInputRef.current.value = "";
      passwordInputRef.current.value = "";
      passwordAgainInputRef.current.value = "";
    }
  }
  const closeAlert = () => {
    setShowAlert(false);
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="signup w-[410px] h-max ">
        <Heading head="SignUp" />
        <TextField head="Name" func={props.nameFunc} inputRef={nameInputRef} />
        <TextField
          head="Number"
          func={props.numberFunc}
          inputRef={numberInputRef}
          type="number"
        />
        <TextField
          head="Choose Password"
          func={props.passwordFunc}
          inputRef={passwordInputRef}
          type="password"

        />
        <TextField
          head="Confirm Password"
          func={setPasswordAgain}
          inputRef={passwordAgainInputRef}
          type="password"

        />
        <PasswordChecklist
          className="text-[12px]"
          rules={["minLength", "number", "match"]}
          minLength={6}
          value={props.passwordValue}
          valueAgain={passwordAgain}
          onChange={(isValid) => {
            psswdcheck = isValid;
          }}
          iconSize={15}
          invalidColor="#520000"
          validColor="#FFDC5F"
        />
        <SubmitButton action="Continue" func={Continue} />
        {showAlert && <Alert alertMsg={alertMsg} closeAlert={closeAlert} />}
      </div>
    </div>
  );
}
