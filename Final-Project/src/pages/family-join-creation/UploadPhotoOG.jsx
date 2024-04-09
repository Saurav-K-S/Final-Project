import React, { useState } from "react";
import Heading from "../../components/Heading";
import SubmitButton from "../../components/SubmitButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UploadPhotoOG(props) {
  const [uploaded, setUploaded] = useState(false);
  const [file, setFile] = useState();
  const [viewFile, setViewFile] = useState();
  const navigate = useNavigate();
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
          navigate("/");
        }
        console.log("image uploaded: ", response.data);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        // Handle error response if needed
      });
  }
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <Heading head={"Welcome " + props.name} />
      <div className="ml-32">
        <div className="flex justify-start items-center ml-6 mt-3 mb-4">
          <div className="w-[52px] h-[10px] border-black border-[1px] rounded-[5px] border-dashed bg-[#FFEEB2]"></div>
          <div className="w-[52px] h-[10px] border-black border-[1px] rounded-[5px] border-dashed bg-[#FFEEB2]"></div>
          <div className="w-[52px] h-[10px] border-black border-[1px] rounded-[5px] border-dashed bg-[#FFEEB2]"></div>
        </div>
        <div className="text-[17px] font-semibold ml-6  font-IBM-Plex-Mono ">
          Create a Family
        </div>
        <div className="ml-[22px] mt-[20px]">
          <div>
            <div className="w-[375px] h-[185px]">
              <label
                htmlFor="fileInput"
                className="file-input relative inline-block cursor-pointer"
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
                <img src={viewFile} />
              </div>
            </div>
          </div>
        </div>
        <div className={uploaded ? "block" : "hidden"}>
          <SubmitButton action="Remove" func={onRemove} />
        </div>
        <SubmitButton action="Continue" func={onContinue} />
      </div>
    </div>
  );
}
