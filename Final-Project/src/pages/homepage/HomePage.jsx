import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { CiEdit } from "react-icons/ci";

export default function HomePage() {
  const [familyName, setFamilyName] = useState("");
  const [familyHistory, setFamilyHistory] = useState("");
  const [imageSRC, setImageSRC] = useState("");
  const [todayEventList, setTodayEventList] = useState();
  const [eventList, setEventList] = useState();
  const [showHomeEdit, setShowHomeEdit] = useState(false);
  const date = new Date();

  useEffect(() => {
    axios
      .get("https://ancestree-backend.onrender.com/api/v1/family/home", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          setFamilyName(response.data.home.name);
          setFamilyHistory(response.data.home.history);
          setImageSRC(response.data.home.image);
          localStorage.setItem("homeImage", response.data.home.image);
        }
      })
      .catch((error) => {
        console.error("Error :", error);
        // Handle error response if needed
      });

    axios
      .get(
        "https://ancestree-backend.onrender.com/api/v1/family/event/notification/" +
          `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(function (response) {
        console.log(response);
        setTodayEventList(response.data.todayEvents);
        setEventList(response.data.events);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  function submitHomeChange() {
    axios
      .put(
        "https://ancestree-backend.onrender.com/api/v1/family/update",
        { name: familyName, history: familyHistory },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(function (response) {
        console.log(response);
        // Close the form
        setShowHomeEdit(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div className="h-screen flex flex-col pt-14 pl-16">
      {showHomeEdit && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <form className="bg-[#FFEEB2] p-8 rounded-lg shadow-lg">
            <label className="block mb-4 font-IBM-Plex-Mono font-semibold">
              Family History:
              <textarea
                //   ref={inputRef}
                //   onChange={(e) => props.func(e.target.value)}
                placeholder="Enter the history of your family"
                value={familyHistory}
                className="resize-none bg-[#FEFFDD] border-[0.1px] border-black border-dashed rounded-[18px] w-[380px]  h-[245px] p-3 mt-[9px] flex justify-start items-start scrollbar-none"
                type="text"
                onChange={(e) => setFamilyHistory(e.target.value)}
                required
              />
            </label>
            <div className="flex justify-between mt-3">
              <div
                className="bg-red text-black px-4 py-2 rounded hover:bg-[#FFE072] border border-black cursor-pointer"
                onClick={() => {
                  submitHomeChange();
                }}
              >
                Submit
              </div>
              <div
                className="bg-black text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                onClick={() => setShowHomeEdit(false)}
              >
                Close
              </div>
            </div>
          </form>
        </div>
      )}
      <div className="min-h-[250px] mr-16 overflow-hidden text-[15px] font-IBM-Plex-Mono rounded-[28px] flex justify-start items-center">
        
        <img src={imageSRC} alt="Not Found" />
      </div>
      <div className="flex justify-between items-center">
        <div className="w-[100%]">
          <div className="flex justify-between pr-10">
            <div className=" h-auto font-semibold text-[44px] ml-[25px] font-IBM-Plex-Mono leading-none">
              {familyName}
            </div>
            <div
              className="clickable h-min py-1 px-3 rounded-lg bg-[#67676733] font-IBM-Plex-Mono cursor-pointer"
              onClick={() => setShowHomeEdit(true)}
            >
              EDIT
            </div>
          </div>
          <div className="w-full h-auto my-3  flex justify-start items-center ">
            <div className="bg-hover-element w-[85px] h-[85px] absolute bg-cover -z-10"></div>
            <div className="text-[28px] pl-[30px] font-IBM-Plex-Mono font-semibold text-black">
              History
            </div>
          </div>
          <div className="h-[165px] text-[18px] ml-[30px] pr-4 font-IBM-Plex-Mono scrollbar-thumb-rounded-sm scrollbar-track-transparent scrollbar scrollbar-thumb-[#FFEEB2] overflow-y-scroll">
            {familyHistory}
          </div>
        </div>
        <div className="w-[20%] ml-10 h-[70%] mr-16  border-dashed border-black border-[0.6px] rounded-[18px] flex flex-col px-10 justify-start items-center">
          <div className="w-[190px] h-[60px] text-[24px] font-IBM-Plex-Mono font-semibold mt-6">
            Notifications
          </div>
          <div className="h-[380px] flex flex-col justify-start items-start  scrollbar-thumb-rounded-sm scrollbar-track-transparent scrollbar scrollbar-thumb-[#FFEEB2] overflow-y-scroll">
              <div className="font-IBM-Plex-Mono  text-[11px] text-[#656565]">
                Today
              </div>
              {todayEventList &&
                todayEventList.map((eventData, index) => (
                  <div>
                    <div className="font-IBM-Plex-Mono text-[16px] text-[#2D2D2D]">
                      {eventData.name}
                    </div>
                    <div className="font-IBM-Plex-Mono text-[11px] text-[#656565]">
                      {eventData.details} scheduled for {eventData.date}
                    </div>
                  </div>
                ))}
              <div className="font-IBM-Plex-Mono text-[11px] text-[#656565]">
                The Coming Days
              </div>
              {eventList &&
                eventList.map((eventData, index) => (
                  <div>
                    <div className="font-IBM-Plex-Mono text-[16px] text-[#2D2D2D]">
                      {eventData.name}
                    </div>
                    <div className="font-IBM-Plex-Mono text-[11px] text-[#656565]">
                      {eventData.details} scheduled for {eventData.date}
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
