import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiCirclePlus, CiFolderOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export default function AlbumPage() {
  const [albumData, setAlbumData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://ancestree-backend.onrender.com/api/v1/family/album/view", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(function (response) {
        if (response.data.success) {
          console.log(response);
          setAlbumData(response.data.albums);
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
        setAlertMsg(erroe.response.data.msg);
        setShowAlert(true);
        console.log(error);
      });
  }, []);

  const handleBoxClick = (id) => {
    navigate("/photos/" + id);
    // const newWindow = window.open(
    //   "https://ancestree.vercel.app/photos/"+id,
    //   "_blank",
    //   "noopener,noreferrer"
    // );
  };
  const closeAlert = () => {
    setShowAlert(false);
  };
  const handleAddFolderClick = () => {
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    console.log("fol;der name: " + folderName);
    e.preventDefault();
    // Send axios request with folderName
    axios
      .post(
        "https://ancestree-backend.onrender.com/api/v1/family/album/create",
        { name: folderName },
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

  return (
    <div className="ml-8 mt-44 h-screen w-full">
      <div className="h-70% grid w-[90%] grid-cols-5  gap-4 gap-y-11 overflow-y-scroll scrollbar-none">
        {albumData.map((boxData, index) => (
          <div
            key={index}
            className="clickable flex h-[200px] w-[180px] cursor-pointer flex-col items-center justify-center rounded-[12px] border-[0.1px]  border-black"
            onClick={() => handleBoxClick(boxData.id)}
          >
            <CiFolderOn size={100} />
            <div className="font-IBM-Plex-Mono text-[18px] font-semibold">
              {boxData.name}
            </div>
            <div className="font-IBM-Plex-Mono text-[11px] text-[#676767]">
              {boxData.date}
            </div>
          </div>
        ))}
        <div
          className="clickable flex h-[200px] w-[180px] cursor-pointer flex-col items-center justify-center rounded-[12px] border-[0.1px]  border-[#676767]"
          onClick={handleAddFolderClick}
        >
          <CiCirclePlus size={100} color="#676767" />
          <div className="font-IBM-Plex-Mono text-[18px] font-semibold text-[#676767]">
            Add Folder
          </div>
        </div>
      </div>
      {showForm && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
          <form
            className="rounded-lg bg-[#FFEEB2] p-8 shadow-lg"
            onSubmit={handleSubmit}
          >
            <label className="mb-4 block font-IBM-Plex-Mono font-semibold">
              Folder Name:
              <input
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
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
