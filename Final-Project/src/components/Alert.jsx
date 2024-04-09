import React from "react";

export default function Alert(props) {
  return (
    <div
      data-dismissible="alert"
      role="alert"
      className=" font-regular relative flex w-full rounded-lg bg-[#FFDC5F] mt-12 px-4 py-4 text-base text-black"
    >
      <div className="shrink-0"></div>
      <div className="ml-3 mr-12">{props.alertMsg}</div>
      <button
        data-dismissible-target="alert"
        className="!absolute top-3 right-3 select-none rounded-lg py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-black transition-all hover:bg-white/10 active:bg-white/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
        onClick={props.closeAlert}
      >
        Close
      </button>
    </div>
  );
}
