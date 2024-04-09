import React from "react";

export default function Heading(props) {
  return (
    <div className="w-max h-[130px] flex justify-start items-center">
      <div className="bg-hover-element w-[160px] h-[160px] absolute bg-cover -z-10"></div>
      <div className="text-[48px] ml-[70px] font-IBM-Plex-Mono font-semibold text-black">
        {props.head}
      </div>
    </div>
  );
}
