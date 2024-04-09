import React from "react";

export default function SubmitButton(props) {
  return (
    <div className="ml-[22px] mt-[35px]">
      <div>
        <button
          onClick={props.func}
          className="clickable cursor-none bg-[#FFEEB2] text-[17px] font-semibold font-IBM-Plex-Mono border-[0.5px] border-black rounded-[18px] w-[380px]  h-[52px] p-3 "
        >
          {props.action}
        </button>
      </div>
    </div>
  );
}
