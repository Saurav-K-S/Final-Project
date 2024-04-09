import React from "react";
import Heading from "../../components/Heading";

export default function OptionSelect(props) {
  function userJoin() {
    props.indexFunc(2)
    console.log("USER JOIN")
    
  }
  function familyCreate() {
    props.indexFunc(3)
    console.log("FAMILY CREATE")
    
  }
  
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div>
        <Heading head={"Welcome " + props.name} />
        <div className="qwert text-[17px] font-semibold ml-[75px] font-IBM-Plex-Mono ">
          Would you like to?
        </div>
        <div className="flex justify-around items-center mt-9">
          <div className="w-[175px] h-[185px] rounded-[18px] border-black border-[1.5px] border-dashed flex flex-col items-center justify-center hover:bg-[#FFEEB2] text-[#6A6A6A] hover:text-black transition-all ease-in-out duration-500 cursor-pointer"
            onClick={userJoin}
          >
            <svg
              width="47"
              height="33"
              viewBox="0 0 47 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.5252 16.5L23.1487 17.1378L23.7705 16.5L23.1487 15.8622L22.5252 16.5ZM21.9017 15.8622L14.8563 23.0687L16.1033 24.3443L23.1487 17.1378L21.9017 15.8622ZM23.1487 15.8622L16.1033 8.65576L14.8563 9.93131L21.9017 17.1378L23.1487 15.8622ZM22.5252 15.5992L0.508213 15.5992V17.4008H22.5252V15.5992Z"
                fill="#6A6A6A"
              />
              <circle
                cx="29.9919"
                cy="16.5"
                r="16.15"
                stroke="#6A6A6A"
                strokeWidth="0.7"
              />
            </svg>
            <div className="text-[18px] mt-3 text-[#6A6A6A font-IBM-Plex-Mono text-center">
              Join Your
              <br />
              Family
            </div>
          </div>
          <div className="w-[175px] h-[185px] rounded-[18px] border-black border-[1.5px] border-dashed flex flex-col items-center justify-center hover:bg-[#FFEEB2] text-[#6A6A6A] hover:text-black transition-all ease-in-out duration-500 cursor-pointer"
          onClick={familyCreate}>
            <svg
              width="31"
              height="31"
              viewBox="0 0 31 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15.5 1V30V1ZM30 15.5H1H30Z" fill="#6A6A6A" />
              <path
                d="M15.5 1V30M30 15.5H1"
                stroke="#6A6A6A"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
            </svg>

            <div className="w-[175px] mt-3 text-[18px] font-IBM-Plex-Mono text-center">
              Create a new
              <br />
              Family
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
