import React from "react";

export default function Heading(props) {
  return (
    <div className="flex h-[130px] w-max items-center justify-start">
      <div className="absolute -z-10 h-[160px] w-[160px] bg-hover-element bg-cover"></div>
      <div className="ml-[70px] font-IBM-Plex-Mono text-[48px] font-semibold text-black">
        {props.head}
      </div>
    </div>
  );
}
