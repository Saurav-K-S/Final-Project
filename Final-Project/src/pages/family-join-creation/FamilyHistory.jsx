import React, { useState } from "react";
import Heading from "../../components/Heading";
import SubmitButton from "../../components/SubmitButton";
import axios from "axios";

export default function FamilyHistory(props) {
  const [history, setHistory] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  function cont() {
    axios
      .post(
        "https://ancestree-backend.onrender.com/api/v1/family/create",
        { name: props.familyName, history: history },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(function (response) {
        if (response.data.success) {
          console.log(response);
          localStorage.setItem("token", response.data.token);
          props.indexFunc(5);
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
        <div className="mb-4 ml-6 mt-3 flex items-center justify-start">
          <div className="h-[10px] w-[52px] rounded-[5px] border-[1px] border-dashed border-black bg-[#FFEEB2]"></div>
          <div className="h-[10px] w-[52px] rounded-[5px] border-[1px] border-dashed border-black bg-[#FFEEB2]"></div>
          <div className="h-[10px] w-[52px] rounded-[5px] border-[1px] border-dashed border-black"></div>
        </div>
        <div className="ml-6 font-IBM-Plex-Mono text-[17px]  font-semibold ">
          Create a Family
        </div>
        <div className="ml-[22px] mt-[20px]">
          <div className="w-[425px]  font-IBM-Plex-Mono text-[14px]">
            Please enter the history of your family
          </div>
          <div className="font-IBM-Plex-Mono text-[13px] text-black">
            <textarea
              //   ref={inputRef}
              //   onChange={(e) => props.func(e.target.value)}
              placeholder="Enter the history of your family"
              className="mt-[9px] flex h-[245px] w-[380px] resize-none items-start justify-start  rounded-[18px] border-[0.1px] border-dashed border-black bg-[#FEFFDD] p-3"
              type="text"
              onChange={(e) => setHistory(e.target.value)}
            />
          </div>
        </div>
        <SubmitButton action="Continue" func={cont} />
      </div>
      {showAlert && <Alert alertMsg={alertMsg} closeAlert={closeAlert} />}
    </div>
  );
}
