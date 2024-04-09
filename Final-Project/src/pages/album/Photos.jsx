import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Photos() {
  const { id } = useParams();
  const [photosData, setPhotosData] = useState([]);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [file, setFile] = useState();
  const [viewFile, setViewFile] = useState();
  const [imageSRC, setImageSRC] = useState();
  useEffect(() => {
    console.log(id);
    axios
      .get(
        "https://ancestree-backend.onrender.com/api/v1/family/album/view/" + id,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(function (response) {
        console.log(response);
        setPhotosData(response.data.albumsFiles);
      })
      .catch(function (error) {
        console.log(error);
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
    formData.append("files", blobToFile);
    console.log(formData);
    axios
      .post(
        "https://ancestree-backend.onrender.com/api/v1/family/album/upload/" +
          id,
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
          setShowImageUpload(false);
        }
        console.log("image uploaded: ", response.data);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        // Handle error response if needed
      });
  }
  return (
    <div className="h-screen w-screen grid grid-cols-3 gap-x-5 gap-y-5 grid-rows-3 p-10 overflow-y-scroll scrollbar-none  ">
      {showImage && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => setShowImage(false)}
        >
          <div className="h-[90%] w-max overflow-clip rounded-lg shadow-lg flex justify-center pointer-events-none">
            <img src={imageSRC} alt="" />
          </div>
        </div>
      )}
      {showImageUpload && (
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
                onClick={() => {
                  onRemove(), setShowImageUpload(false);
                }}
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
      {photosData.map((photosData, index) => (
        <div
          className="clickable overflow-hidden h-auto w-auto rounded-3xl border-[1px] border-black flex justify-center items-center"
          onClick={() => {
            setShowImage(true), setImageSRC(photosData);
          }}
        >
          <img src={photosData} alt="" srcset="" />
        </div>
      ))}
      <div
        className="clickable h-auto w-auto p-10 rounded-3xl border-[1px] border-black flex justify-center items-center"
        onClick={() => {
          setShowImageUpload(true);
        }}
      >
        Upload Image
      </div>
    </div>
  );
}
