import React from "react";

export default function TextField(props) {
  const inputRef = props.inputRef || React.createRef();

  return (
    <div className="ml-[22px] mt-[20px]">
      <div className="w-[425px] text-[14px] font-IBM-Plex-Mono">
        {props.head}
      </div>
      <div>
        <input
          ref={inputRef}
          onChange={(e) => props.func(e.target.value)}
          className="bg-[#FEFFDD] cursor-none border-[0.1px] border-black border-dashed rounded-[18px] w-[380px]  h-[52px] p-3 mt-[9px]"
          type={props.type}
        />
      </div>
    </div>
  );
}
