import React, { useState } from "react";
import ForgotPasswordNumber from "./ForgotPasswordNumber";
import ForgotPasswordOTP from "./ForgotPasswordOTP";
import ChangePassword from "./ChangePassword";

export default function ForgotPassword() {
  const [index, setIndex] = useState(0);
  const [number, setNumber] = useState();
  const [otpOG, setOTPOGVal] = useState();

  switch (index) {
    case 0:
      return (
        <ForgotPasswordNumber
          indexFunc={setIndex}
          numberFunc={setNumber}
          numberValue={number}
          otpOGFunc={setOTPOGVal}
        />
      );
    case 1:
      return <ForgotPasswordOTP indexFunc={setIndex} otpOGVal={otpOG} />;
    case 2:
      return <ChangePassword indexFunc={setIndex} numberValue={number} />;

    default:
      break;
  }
}
