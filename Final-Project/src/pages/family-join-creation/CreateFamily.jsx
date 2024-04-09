import React from "react";
import Heading from "../../components/Heading";
import TextField from "../../components/TextField";
import SubmitButton from "../../components/SubmitButton";

export default function CreateFamily(props) {
  function cont() {
    props.indexFunc(4)
    
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <Heading head={"Welcome " + props.name} />
      <div className="ml-32">
        <div className="flex justify-start items-center ml-6 mt-3 mb-4">
          <div className="w-[52px] h-[10px] border-black border-[1px] rounded-[5px] border-dashed bg-[#FFEEB2]"></div>
          <div className="w-[52px] h-[10px] border-black border-[1px] rounded-[5px] border-dashed"></div>
          <div className="w-[52px] h-[10px] border-black border-[1px] rounded-[5px] border-dashed"></div>
        </div>
        <div className="text-[17px] font-semibold ml-6  font-IBM-Plex-Mono ">
          Create a Family
        </div>
        <TextField head="Please enter the name of your family" value="text" func={props.familyNameFunc}/>
        <SubmitButton action="Continue" func={cont}/>
      </div>
    </div>
  );
}
