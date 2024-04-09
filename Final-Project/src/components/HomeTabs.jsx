import React from "react";

export default function HomeTabs({ name, svg, index, tabClick, active }) {
  const handleTabClick = () => {
    tabClick(index);
  };
  return (
    <div
      className={
        active == 1
          ? "clickable w-[110px] h-[110px] mt-6 border-black border-[0.6px] border-dashed flex flex-col justify-center items-center rounded-[18px] bg-[#FFEEB2] transition-all ease-in-out"
          : "clickable w-[110px] h-[85px] mt-6 border-black border-[0.6px] border-dashed flex flex-col justify-center items-center rounded-[18px] transition-all ease-in-out"
      }
      onClick={handleTabClick}
    >
      {svg}
      <div
        className={
          active == 1
            ? "mt-[4px] font-IBM-Plex-Mono text-[15px] text-black font-bold"
            : "mt-[4px] font-IBM-Plex-Mono text-[15px] text-[#6A6A6A]"
        }
      >
        {name}
      </div>
    </div>
  );
}
