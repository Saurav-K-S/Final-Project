import React, { useState } from "react";
import TextField from "../../components/TextField";
import SubmitButton from "../../components/SubmitButton";
import Heading from "../../components/Heading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FamilyJoin(props) {
  const [refID, setrefID] = useState();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  function join() {
    axios
      .put(
        "https://ancestree-backend.onrender.com/api/v1/user/refUpdate",
        { ref: refID },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(function (response) {
        console.log(response);
        if (response.data.success) {
          localStorage.setItem("token", response.data.token);

          navigate("/basepage");
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
        setAlertMsg(error.response.data.msg);
        setShowAlert(true);
        console.log(error);
      });
  }
  const closeAlert = () => {
    setShowAlert(false);
  };
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Heading head={"Welcome " + props.name} />
      <div className="ml-32">
        <div className="ml-6 font-IBM-Plex-Mono text-[17px]  font-semibold ">
          Join a Family
        </div>
        <TextField
          head="Please enter the referral id of your family"
          value="text"
          func={setrefID}
        />
        <SubmitButton action="Continue" func={join} />
      </div>
      {showAlert && <Alert alertMsg={alertMsg} closeAlert={closeAlert} />}
    </div>
  );
}
