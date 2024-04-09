import axios from "axios";
import React, { useEffect, useState } from "react";
import {  CiPhone } from "react-icons/ci";

export default function Profile() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [number, setNumber] = useState();
  const [id, setId] = useState();
  const [imageEdit, setImageEdit] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [file, setFile] = useState();
  const [viewFile, setViewFile] = useState();
  useEffect(() => {
    axios
      .get("https://ancestree-backend.onrender.com/api/v1/user/view", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          setName(response.data.user.name);
          setEmail(response.data.user.email);
          setNumber(response.data.user.mobileNumber);
          setId(response.data.user.__v);
        }
      })
      .catch((error) => {
        console.error("Error :", error);
        // Handle error response if needed
      });
  }, []);
  function onChange(e) {
    setUploaded(true);
    console.log(e);
    console.log(e.target.files[0]);
    setViewFile(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  }
  function onRemove() {
    setUploaded(false);
    setFile(null);
  }

  function onContinue() {
    const blob = new Blob([file], { type: "image/png" });
    const blobToFile = new File([blob], "image1.png", { type: blob.type });
    console.log(blobToFile);
    const formData = new FormData();
    formData.append("image", blobToFile);
    console.log(formData);
    axios
      .post(
        "https://ancestree-backend.onrender.com/api/v1/family/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          setImageEdit(false);
        }
        console.log("image uploaded: ", response.data);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        // Handle error response if needed
      });
  }
  return (
    <div className="h-screen flex flex-col pt-14 pl-16">
      {imageEdit && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <form className="bg-[#FFEEB2] p-8 rounded-lg shadow-lg">
            <label className="block mb-4 font-IBM-Plex-Mono font-semibold">
              Family Photo:
              <div>
                <div className="w-[375px] h-[185px]">
                  <label
                    // htmlFor="fileInput"
                    className=" relative inline-block cursor-pointer"
                  >
                    <input
                      type="file"
                      id="fileInput"
                      className="hidden"
                      onChange={onChange}
                    />
                    <div
                      className={
                        uploaded
                          ? "-z-2 hidden w-[375px] absolute h-[185px]"
                          : "z-1 w-[375px] absolute h-[185px] border-[#6A6A6A] border-[1px] border-dashed rounded-[18px] flex flex-col justify-center items-center"
                      }
                    >
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
                      <div className="font-IBM-Plex-Mono text-[14px] text-[#6A6A6A] mt-3">
                        Upload Picture
                      </div>
                    </div>
                  </label>

                  <div
                    // key={index}
                    className={
                      uploaded
                        ? "z-1 absolute w-[375px] h-[185px]   overflow-hidden border-[#6A6A6A] border-[1px] border-dashed rounded-[18px] flex flex-col justify-center items-center"
                        : " -z-2 absolute w-[375px] h-[185px] hidden"
                    }
                  >
                    <img 
                    src={viewFile}
                    // src="https://drive.google.com/thumbnail?id=1gve52txpLoVqQS7zHhEzMNHkIQCHFc4i&sz=w1000"
                     />
                  </div>
                </div>
              </div>
            </label>
            <div className="flex justify-between mt-10">
            <div className={uploaded ? "block" : "hidden"}>
              <div
                className="clickable bg-red text-black px-4 py-2 rounded hover:bg-[#FFE072] border border-black cursor-pointer"
                onClick={() => {
                  onContinue();
                }}
              >
                Submit
              </div>
              
            </div>
              <div
                className="clickable bg-black text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                onClick={() => {onRemove(),setImageEdit(false)}}
              >
                Close
              </div>
            </div>
            {/* <div className="flex justify-between mt-3">
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
            </div> */}
          </form>
        </div>
      )}
      <div className="max-h-[250px] mr-16 overflow-hidden text-[15px] font-IBM-Plex-Mono rounded-[28px] flex justify-start items-center">
        <img src={localStorage.getItem("homeImage")} alt="Not Found" />
        <div
          className="clickable fixed right-16  top-4 bg-[#FFEEB2] w-max  h-max px-3 rounded-md border border-black border-dashed text-[18px] font-IBM-Plex-Mono cursor-pointer"
          onClick={() => {
            setImageEdit(true);
          }}
        >
          EDIT PHOTO
        </div>
      </div>
      <div className="mt-3 w-full flex flex-row justify-between items-center">
        <div>
          <div className="w-auto font-semibold text-[32px] font-IBM-Plex-Mono">
            {name}
          </div>
          <div className="text-[24px] font-IBM-Plex-Mono text-[#676767]  mt-11">
            {email}
          </div>
        </div>
        <div className="w-max flex flex-col justify-end items-end pr-14">
          <div className="w-max h-auto text-[24px] font-IBM-Plex-Mono bg-[#CCFFE0] text-[#3C8B5C] rounded-[9px] px-5">
            {id}
          </div>

          <div className="w-max text-[30px] flex items-center font-IBM-Plex-Mono  mt-11">
            <div>
              <CiPhone size={30} />
            </div>
            <div>{number}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
