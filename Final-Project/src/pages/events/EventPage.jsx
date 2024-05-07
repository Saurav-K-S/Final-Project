import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TimePicker from "react-time-picker";
import { CiCirclePlus } from "react-icons/ci";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-time-picker/dist/TimePicker.css';

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
    <div className="w-full h-screen ml-8 mt-44">
      <div className="w-[90%] h-[70%] grid grid-cols-2  gap-4 gap-y-11 overflow-y-scroll scrollbar-none">
        {eventData.map((boxData, index) => (
          <div
            key={index}
            className="w-[430px] h-[200px] flex flex-col justify-start pt-5 items-start rounded-[12px] border-[0.1px] border-black  cursor-pointer overflow-y-scroll scrollbar-thumb-rounded-sm scrollbar-track-transparent scrollbar scrollbar-thumb-[#FFEEB2]"
            // onClick={() => handleBoxClick(boxData.id)}
          >
            <div className="w-full px-7 flex flex-row justify-between items-center">
              <div className="font-IBM-Plex-Mono text-[18px] font-semibold">
                {boxData.name}
              </div>
              <div className="font-IBM-Plex-Mono bg-[#676767] text-[11px] text-[#676767] bg-opacity-[8%] px-4 rounded-md py-2">
                {boxData.place}
              </div>
              <div
                className="clickable font-IBM-Plex-Mono bg-black text-[11px] text-white px-4 rounded-md py-2"
                onClick={() => {
                  setShowDeleteConf(true),
                    setDeleteId(boxData._id),
                    console.log(deleteId);
                }}
              >
                Delete Event?
              </div>
            </div>
            <div className="font-IBM-Plex-Mono text-[#676767] px-7 pt-5">
              {formatDate(boxData.date)}
            </div>
            <div className="font-IBM-Plex-Mono px-7 pt-5">
              {boxData.details}
            </div>
          </div>
        ))}
        <div
          className="clickable w-[180px] h-[200px] flex flex-col justify-center items-center rounded-[12px] border-[0.1px] border-[#676767]  cursor-pointer"
          onClick={handleAddEventClick}
        >
          <CiCirclePlus size={100} color="#676767" />
          <div className="font-IBM-Plex-Mono text-[18px] font-semibold text-[#676767]">
            Add Event
          </div>
        </div>
      </div>
      {showDeleteConf && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <form className="bg-[#FFEEB2] p-8 rounded-lg shadow-lg">
            <label className="block mb-4 font-IBM-Plex-Mono font-semibold">
              Are you sure you want to delete the event?
              <div className="flex justify-between mt-3">
                <div
                  className="bg-red text-black px-4 py-2 rounded hover:bg-[#FFE072] border border-black cursor-pointer"
                  onClick={() => {
                    deleteEvent(deleteId);
                  }}
                >
                  Delete
                </div>
                <div
                  className="bg-black text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
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
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <form
            className="bg-[#FFEEB2] p-8 rounded-lg shadow-lg"
            onSubmit={handleSubmit}
          >
            <label className="block mb-4 font-IBM-Plex-Mono font-semibold">
              Event Name:
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="border rounded-md w-full h-10 mt-1 pl-2"
                required
              />
            </label>
            <label className="block mb-4 font-IBM-Plex-Mono font-semibold">
              Event Place:
              <input
                type="text"
                value={eventPlace}
                onChange={(e) => setEventPlace(e.target.value)}
                className="border rounded-md w-full h-10 mt-1 pl-2"
                required
              />
            </label>
            <label className="block mb-4 font-IBM-Plex-Mono font-semibold">
              Event Date: <br />
              <DatePicker
                className="border rounded-md w-[165%] h-10 mt-1 pl-2"
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
            <label className="block mb-4 font-IBM-Plex-Mono font-semibold">
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
            <label className="block mb-4 font-IBM-Plex-Mono font-semibold">
              Event Details:
              <input
                type="text"
                value={eventDetails}
                onChange={(e) => setEventDetails(e.target.value)}
                className="border rounded-md w-full h-10 mt-1 pl-2"
                required
              />
            </label>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-[#FFE072] text-black px-4 py-2 rounded hover:bg-[#FFE072]"
              >
                Submit
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="bg-black text-white px-4 py-2 rounded hover:bg-red-600"
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
