import React from "react";
import Heading from "../../components/Heading";
import TextField from "../../components/TextField";
import SubmitButton from "../../components/SubmitButton";

export default function CreateFamily(props) {
  function cont() {
    props.indexFunc(4);
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Heading head={"Welcome " + props.name} />
      <div className="ml-32">
        <div className="mb-4 ml-6 mt-3 flex items-center justify-start">
          <div className="h-[10px] w-[52px] rounded-[5px] border-[1px] border-dashed border-black bg-[#FFEEB2]"></div>
          <div className="h-[10px] w-[52px] rounded-[5px] border-[1px] border-dashed border-black"></div>
          <div className="h-[10px] w-[52px] rounded-[5px] border-[1px] border-dashed border-black"></div>
        </div>
        <div className="ml-6 font-IBM-Plex-Mono text-[17px]  font-semibold ">
          Create a Family
        </div>
        <TextField
          head="Please enter the name of your family"
          value="text"
          func={props.familyNameFunc}
        />
        <SubmitButton action="Continue" func={cont} />
      </div>
    </div>
  );
}
