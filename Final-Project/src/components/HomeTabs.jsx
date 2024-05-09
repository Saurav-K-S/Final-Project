import React from "react";

export default function HomeTabs({ name, svg, index, tabClick, active }) {
  const handleTabClick = () => {
    tabClick(index);
  };
  return (
    <div
      className={
        active == 1
          ? "clickable mt-6 flex h-[110px] w-[110px] flex-col items-center justify-center rounded-[18px] border-[0.6px] border-dashed border-black bg-[#FFEEB2] transition-all ease-in-out"
          : "clickable mt-6 flex h-[85px] w-[110px] flex-col items-center justify-center rounded-[18px] border-[0.6px] border-dashed border-black transition-all ease-in-out"
      }
      onClick={handleTabClick}
    >
      {svg}
      <div
        className={
          active == 1
            ? "mt-[4px] font-IBM-Plex-Mono text-[15px] font-bold text-black"
            : "mt-[4px] font-IBM-Plex-Mono text-[15px] text-[#6A6A6A]"
        }
      >
        {name}
      </div>
    </div>
  );
}
