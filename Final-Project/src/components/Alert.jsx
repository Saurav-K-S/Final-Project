import React from "react";

export default function Alert(props) {
  return (
    <div
      data-dismissible="alert"
      role="alert"
      className=" font-regular relative mt-12 flex w-full rounded-lg bg-[#FFDC5F] px-4 py-4 text-base text-black"
    >
      <div className="shrink-0"></div>
      <div className="ml-3 mr-12">{props.alertMsg}</div>
      <button
        data-dismissible-target="alert"
        className="font-sans !absolute right-3 top-3 select-none rounded-lg px-4 py-2 text-center align-middle text-xs font-bold uppercase text-black transition-all hover:bg-white/10 active:bg-white/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
        onClick={props.closeAlert}
      >
        Close
      </button>
    </div>
  );
}
