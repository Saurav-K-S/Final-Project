import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiCirclePlus, CiFolderOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export default function AlbumPage() {
  const [albumData, setAlbumData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [folderName, setFolderName] = useState("");
const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://ancestree-backend.onrender.com/api/v1/family/album/view", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(function (response) {
        console.log(response);
        setAlbumData(response.data.albums);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleBoxClick = (id) => {
    navigate('/photos/'+id)
    // const newWindow = window.open(
    //   "https://ancestree.vercel.app/photos/"+id,
    //   "_blank",
    //   "noopener,noreferrer"
    // );
  };

  const handleAddFolderClick = () => {
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    console.log("fol;der name: "+ folderName)
    e.preventDefault();
    // Send axios request with folderName
    axios
      .post("https://ancestree-backend.onrender.com/api/v1/family/album/create", { name: folderName}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(function (response) {
        console.log(response);
        // Close the form
        setShowForm(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="w-full h-screen ml-8 mt-44">
      <div className="w-[90%] h-70% grid grid-cols-5  gap-4 gap-y-11 overflow-y-scroll scrollbar-none">
        {albumData.map((boxData, index) => (
          <div
            key={index}
            className="clickable w-[180px] h-[200px] flex flex-col justify-center items-center rounded-[12px] border-[0.1px] border-black  cursor-pointer"
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
          className="clickable w-[180px] h-[200px] flex flex-col justify-center items-center rounded-[12px] border-[0.1px] border-[#676767]  cursor-pointer"
          onClick={handleAddFolderClick}
        >
          <CiCirclePlus size={100} color="#676767"/>
          <div className="font-IBM-Plex-Mono text-[18px] text-[#676767] font-semibold">
            Add Folder
          </div>
        </div>
      </div>
      {showForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <form className="bg-[#FFEEB2] p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
            <label className="block mb-4 font-IBM-Plex-Mono font-semibold">
              Folder Name:
              <input
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
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
    </div>
  );
}
