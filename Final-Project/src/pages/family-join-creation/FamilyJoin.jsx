import React, { useState } from "react";
import TextField from "../../components/TextField";
import SubmitButton from "../../components/SubmitButton";
import Heading from "../../components/Heading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FamilyJoin(props) {
  const [refID, setrefID] = useState();
  const navigate = useNavigate();

  function join() {
    axios.put("https://ancestree-backend.onrender.com/api/v1/user/refUpdate",{ref:refID},{
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then(function (response) {
      console.log(response)
      if (response.data.success) {
        localStorage.setItem('token', response.data.token)
        
        navigate('/basepage')
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <Heading head={"Welcome " + props.name} />
      <div className="ml-32">
        <div className="text-[17px] font-semibold ml-6  font-IBM-Plex-Mono ">
          Join a Family
        </div>
        <TextField
          head="Please enter the referral id of your family"
          value="text"
          func={setrefID}
        />
        <SubmitButton action="Continue" func={join}/>
      </div>
    </div>
  );
}
