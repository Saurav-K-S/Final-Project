import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { format } from "date-fns";
import Alert from "../../components/Alert";

export default function HomePage() {
  const [familyName, setFamilyName] = useState("");
  const [familyHistory, setFamilyHistory] = useState("");
  const [familyRef, setFamilyRef] = useState("");
  const [imageSRC, setImageSRC] = useState("");
  const [todayEventList, setTodayEventList] = useState();
  const [eventList, setEventList] = useState();
  const [showHomeEdit, setShowHomeEdit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const date = new Date();
  const formatDate = (dateString) => {
    if (dateString == null) {
      return "";
    }
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy");
  };
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
          setFamilyRef(response.data.home.ref);
          setImageSRC(response.data.home.image);
          localStorage.setItem("homeImage", response.data.home.image);
        } else {
          setAlertMsg(response.data.msg);
          setShowAlert(true);
        }
      })
      .catch((error) => {
        console.error("Error :", error);
        setAlertMsg(error.response.data.msg);
        setShowAlert(true);
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
        if (response.data.success) {
          console.log(response);
          setTodayEventList(response.data.todayEvents);
          setEventList(response.data.events);
        } else {
          setAlertMsg(response.data.msg);
          setShowAlert(true);
        }
      })
      .catch(function (error) {
        if (error.response.status == 401) {
          navigate("/");
          localStorage.setItem("token", "");
        }
        setAlertMsg(error.response.data.msg);
        setShowAlert(true);
        console.log(error);
      });
  }, []);
  const closeAlert = () => {
    setShowAlert(false);
  };
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
        if (error.response.status == 401) {
          navigate("/");
          localStorage.setItem("token", "");
        }
        console.log(error);
      });
  }
  return (
    <div className="flex h-screen flex-col pl-16 pt-14">
      {showHomeEdit && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
          <form className="rounded-lg bg-[#FFEEB2] p-8 shadow-lg">
            <label className="mb-4 block font-IBM-Plex-Mono font-semibold">
              Family History:
              <textarea
                //   ref={inputRef}
                //   onChange={(e) => props.func(e.target.value)}
                placeholder="Enter the history of your family"
                value={familyHistory}
                className="mt-[9px] flex h-[245px] w-[380px] resize-none items-start justify-start  rounded-[18px] border-[0.1px] border-dashed border-black bg-[#FEFFDD] p-3 scrollbar-none"
                type="text"
                onChange={(e) => setFamilyHistory(e.target.value)}
                required
              />
            </label>
            <div className="mt-3 flex justify-between">
              <div
                className="bg-red cursor-pointer rounded border border-black px-4 py-2 text-black hover:bg-[#FFE072]"
                onClick={() => {
                  submitHomeChange();
                }}
              >
                Submit
              </div>
              <div
                className="cursor-pointer rounded bg-black px-4 py-2 text-white hover:bg-red-600"
                onClick={() => setShowHomeEdit(false)}
              >
                Close
              </div>
            </div>
          </form>
        </div>
      )}
      <div className="mr-16 flex min-h-[250px] items-center justify-start overflow-hidden rounded-[28px] font-IBM-Plex-Mono text-[15px]">
        <img src={imageSRC} alt="Not Found" />
      </div>
      <div className="flex items-center justify-between">
        <div className="w-[100%]">
          <div className="flex justify-between pr-10">
            <div className=" ml-[25px] h-auto font-IBM-Plex-Mono text-[44px] font-semibold leading-none">
              {familyName}
            </div>

            <div
              className="clickable h-min cursor-pointer rounded-lg bg-[#67676733] px-3 py-1 font-IBM-Plex-Mono"
              onClick={() => setShowHomeEdit(true)}
            >
              EDIT
            </div>
          </div>
          <div className=" ml-[25px] mt-[15px] h-auto font-IBM-Plex-Mono text-[24px] font-semibold leading-none">
            Family Referral: {familyRef}
          </div>
          <div className="my-3 flex h-auto  w-full items-center justify-start ">
            <div className="absolute -z-10 h-[85px] w-[85px] bg-hover-element bg-cover"></div>
            <div className="pl-[30px] font-IBM-Plex-Mono text-[28px] font-semibold text-black">
              History
            </div>
          </div>
          <div className="ml-[30px] h-[165px] overflow-y-scroll pr-4 font-IBM-Plex-Mono text-[18px] scrollbar scrollbar-track-transparent scrollbar-thumb-[#FFEEB2] scrollbar-thumb-rounded-sm">
            {familyHistory}
          </div>
        </div>
        <div className="ml-10 mr-16 flex h-[70%]  w-[30%] flex-col items-center justify-start rounded-[18px] border-[0.6px] border-dashed border-black">
          <div className="mt-6 font-IBM-Plex-Mono text-[24px] font-semibold">
            Notifications
          </div>
          <div className="flex h-[380px] w-auto flex-col items-start justify-start overflow-y-scroll  px-4 scrollbar scrollbar-track-transparent scrollbar-thumb-[#FFEEB2] scrollbar-thumb-rounded-sm">
            <div className="w-max font-IBM-Plex-Mono  text-[11px] text-[#656565] ">
              Today
            </div>
            {todayEventList &&
              todayEventList.map((eventData, index) => (
                <div className="rounded-[9px] border-[0.6px] border-dashed border-black">
                  <div className="font-IBM-Plex-Mono text-[16px] text-[#2D2D2D]">
                    {eventData.name}
                  </div>
                  <div className="font-IBM-Plex-Mono text-[11px] text-[#656565]">
                    {eventData.details} <br />Scheduled for {eventData.date}
                  </div>
                </div>
              ))}
            <div className="font-IBM-Plex-Mono text-[11px] text-[#656565]">
              The Coming Days
            </div>
            {eventList &&
              eventList.map((eventData, index) => (
                <div className="mt-4 rounded-[9px] border-[0.6px] border-dashed border-black p-2">
                  <div className="font-IBM-Plex-Mono text-[16px] text-[#2D2D2D]">
                    {eventData.name}
                  </div>
                  <div className="font-IBM-Plex-Mono text-[11px] text-[#656565]">
                    {eventData.details} <br />Scheduled for{" "}
                    {formatDate(eventData.date)}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {showAlert && <Alert alertMsg={alertMsg} closeAlert={closeAlert} />}
    </div>
  );
}
