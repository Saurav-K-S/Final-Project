import React from "react";

export default function SubmitButton(props) {
  return (
    <div className="ml-[22px] mt-[35px]">
      <div>
        <button
          onClick={props.func}
          className="clickable h-[52px] w-[380px] cursor-none rounded-[18px] border-[0.5px] border-black bg-[#FFEEB2] p-3 font-IBM-Plex-Mono  text-[17px] font-semibold "
        >
          {props.action}
        </button>
      </div>
    </div>
  );
}
