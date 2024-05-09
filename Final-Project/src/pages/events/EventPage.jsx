import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TimePicker from "react-time-picker";
import { CiCirclePlus } from "react-icons/ci";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";

export default function EventPage() {
  const [eventData, seteventData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteConf, setShowDeleteConf] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventPlace, setEventPlace] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventDetails, setEventDetails] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const navigate = useNavigate();

  const date = new Date();
  const formatDate = (dateString) => {
    if (dateString == null) {
      return "";
    }
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy");
  };
  const formatDateFn = (date) => {
    const selectedDate = new Date(date);
    return (
      selectedDate.getFullYear() +
      "-" +
      parseInt(selectedDate.getMonth() + 1) +
      "-" +
      selectedDate.getDate()
    );
  };
  useEffect(() => {
    axios
      .get(
        "https://ancestree-backend.onrender.com/api/v1/family/event/view/" +
          `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(function (response) {
        console.log(response);
        if (response.data.success) {
          seteventData(response.data.events);
          console.log("LAAAAAAAAAAAAAAAAAAAA" + eventData);
        } else {
          setAlertMsg(response.data.msg);
          setShowAlert(true);
        }
      })
      .catch(function (error) {
        if (!error.response.data.status) {
          if (error.response.status == 401) {
            navigate("/");
            localStorage.setItem("token", "");
          }
        }
        setAlertMsg(error.response.data.msg);
        setShowAlert(true);
        console.log(error);
      });
  }, []);
  const closeAlert = () => {
    setShowAlert(false);
  };

  // const handleBoxClick = (id) => {
  //   const newWindow = window.open(
  //     "https://drive.google.com/drive/folders/" + id + "?usp=drive_link",
  //     "_blank",
  //     "noopener,noreferrer"
  //   );
  // };

  const handleAddEventClick = () => {
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send axios request with folderName
    axios
      .post(
        "https://ancestree-backend.onrender.com/api/v1/family/event/create",
        {
          name: eventName,
          place: eventPlace,
          date: eventDate,
          time: eventTime,
          details: eventDetails,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(function (response) {
        console.log(response);
        // Close the form
        setShowForm(false);
      })
      .catch(function (error) {
        if (error.response.status == 401) {
          navigate("/");
          localStorage.setItem("token", "");
        }
        console.log(error);
      });
  };

  function deleteEvent(id) {
    axios
      .delete(
        "https://ancestree-backend.onrender.com/api/v1/family/event/delete/" +
          id,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(function (response) {
        console.log(response);
        // Close the form
        setShowDeleteConf(false);
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
    <div className="ml-8 mt-44 h-screen w-full">
      <div className="grid h-[70%] w-[90%] grid-cols-2  gap-4 gap-y-11 overflow-y-scroll scrollbar-none">
        {eventData.map((boxData, index) => (
          <div
            key={index}
            className="flex h-[200px] w-[430px] cursor-pointer flex-col items-start justify-start overflow-y-scroll rounded-[12px] border-[0.1px]  border-black pt-5 scrollbar scrollbar-track-transparent scrollbar-thumb-[#FFEEB2] scrollbar-thumb-rounded-sm"
            // onClick={() => handleBoxClick(boxData.id)}
          >
            <div className="flex w-full flex-row items-center justify-between px-7">
              <div className="font-IBM-Plex-Mono text-[18px] font-semibold">
                {boxData.name}
              </div>
              <div className="rounded-md bg-[#676767] bg-opacity-[8%] px-4 py-2 font-IBM-Plex-Mono text-[11px] text-[#676767]">
                {boxData.place}
              </div>
              <div
                className="clickable rounded-md bg-black px-4 py-2 font-IBM-Plex-Mono text-[11px] text-white"
                onClick={() => {
                  setShowDeleteConf(true),
                    setDeleteId(boxData._id),
                    console.log(deleteId);
                }}
              >
                Delete Event?
              </div>
            </div>
            <div className="px-7 pt-5 font-IBM-Plex-Mono text-[#676767]">
              {formatDate(boxData.date)}
            </div>
            <div className="px-7 pt-5 font-IBM-Plex-Mono">
              {boxData.details}
            </div>
          </div>
        ))}
        <div
          className="clickable flex h-[200px] w-[180px] cursor-pointer flex-col items-center justify-center rounded-[12px] border-[0.1px]  border-[#676767]"
          onClick={handleAddEventClick}
        >
          <CiCirclePlus size={100} color="#676767" />
          <div className="font-IBM-Plex-Mono text-[18px] font-semibold text-[#676767]">
            Add Event
          </div>
        </div>
      </div>
      {showDeleteConf && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
          <form className="rounded-lg bg-[#FFEEB2] p-8 shadow-lg">
            <label className="mb-4 block font-IBM-Plex-Mono font-semibold">
              Are you sure you want to delete the event?
              <div className="mt-3 flex justify-between">
                <div
                  className="bg-red cursor-pointer rounded border border-black px-4 py-2 text-black hover:bg-[#FFE072]"
                  onClick={() => {
                    deleteEvent(deleteId);
                  }}
                >
                  Delete
                </div>
                <div
                  className="cursor-pointer rounded bg-black px-4 py-2 text-white hover:bg-red-600"
                  onClick={() => setShowDeleteConf(false)}
                >
                  Close
                </div>
              </div>
            </label>
          </form>
        </div>
      )}
      {showForm && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
          <form
            className="rounded-lg bg-[#FFEEB2] p-8 shadow-lg"
            onSubmit={handleSubmit}
          >
            <label className="mb-4 block font-IBM-Plex-Mono font-semibold">
              Event Name:
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="mt-1 h-10 w-full rounded-md border pl-2"
                required
              />
            </label>
            <label className="mb-4 block font-IBM-Plex-Mono font-semibold">
              Event Place:
              <input
                type="text"
                value={eventPlace}
                onChange={(e) => setEventPlace(e.target.value)}
                className="mt-1 h-10 w-full rounded-md border pl-2"
                required
              />
            </label>
            <label className="mb-4 block font-IBM-Plex-Mono font-semibold">
              Event Date: <br />
              <DatePicker
                className="mt-1 h-10 w-[165%] rounded-md border pl-2"
                selected={eventDate}
                onChange={(date) => {
                  setEventDate(formatDateFn(date));
                  console.log(eventDate);
                  console.log(eventTime);
                }}
                dateFormat="YYYY-MM-dd"
              />
              {/* <input
                type="text"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="border rounded-md w-full h-10 mt-1 pl-2"
                required
              /> */}
            </label>
            <label className="mb-4 block font-IBM-Plex-Mono font-semibold">
              Event Time:
              <TimePicker
                // className="border rounded-md w-full h-10 mt-1 pl-2"
                onChange={setEventTime}
                value={eventTime}
                disableClock="false"
              />
              {/* <input
                type="text"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                className="border rounded-md w-full h-10 mt-1 pl-2"
                required
              /> */}
            </label>
            <label className="mb-4 block font-IBM-Plex-Mono font-semibold">
              Event Details:
              <input
                type="text"
                value={eventDetails}
                onChange={(e) => setEventDetails(e.target.value)}
                className="mt-1 h-10 w-full rounded-md border pl-2"
                required
              />
            </label>
            <div className="flex justify-between">
              <button
                type="submit"
                className="rounded bg-[#FFE072] px-4 py-2 text-black hover:bg-[#FFE072]"
              >
                Submit
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="rounded bg-black px-4 py-2 text-white hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      )}
      {showAlert && <Alert alertMsg={alertMsg} closeAlert={closeAlert} />}
    </div>
  );
}
