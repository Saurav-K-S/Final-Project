import React, { useState, useRef } from "react";
import SignUpEmail from "./SignUpEmail";
import SignUpNumber from "./SignUpNumber";
import Login from "./Login";
import OTP from "./OTP";

export default function SignUp() {
  const [index, setIndex] = useState(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassord] = useState("");
  const [number, setNumber] = useState();

  const [otpOG, setOtpOG] = useState("");

  switch (index) {
    case 0:
      return (
        <SignUpEmail
        name={name}
          indexFunc={setIndex}
          nameFunc={setName}
          numberFunc={setNumber}
          passwordFunc={setPassord}
          passwordValue={password}
        />
      );
    case 1:
      return (
        <SignUpNumber
          indexFunc={setIndex}
          emailFunc={setEmail}
          emailValue={email}
          otpFunc={setOtpOG}
        />
      );
    case 2:
      return (
        <OTP
          indexFunc={setIndex}
          otpOGVal={otpOG}
          nameValue={name}
          emailValue={email}
          passwordValue={password}
          numberValue={number}
        />
      );
    case 3:
      return (
        <Login
          newUser={true}
        />
      );
    default:
      break;
  }
}
