import React from "react";

export default function TextField(props) {
  const inputRef = props.inputRef || React.createRef();

  return (
    <div className="ml-[22px] mt-[20px]">
      <div className="w-[425px] font-IBM-Plex-Mono text-[14px]">
        {props.head}
      </div>
      <div>
        <input
          ref={inputRef}
          onChange={(e) => props.func(e.target.value)}
          className="mt-[9px] h-[52px] w-[380px] cursor-none rounded-[18px] border-[0.1px] border-dashed  border-black bg-[#FEFFDD] p-3"
          type={props.type}
        />
      </div>
    </div>
  );
}
