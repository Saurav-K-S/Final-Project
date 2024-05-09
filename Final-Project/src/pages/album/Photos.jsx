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
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
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
        if (response.data.success) {
          console.log(response);
          setPhotosData(response.data.albumsFiles);
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
    <div className="grid h-screen w-screen grid-cols-3 grid-rows-3 gap-x-5 gap-y-5 overflow-y-scroll p-10 scrollbar-none  ">
      {showImage && (
        <div
          className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowImage(false)}
        >
          <div className="pointer-events-none flex h-[90%] w-max justify-center overflow-clip rounded-lg shadow-lg">
            <img src={imageSRC} alt="" />
          </div>
        </div>
      )}
      {showImageUpload && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
          <form className="rounded-lg bg-[#FFEEB2] p-8 shadow-lg">
            <label className="mb-4 block font-IBM-Plex-Mono font-semibold">
              Family Photo:
              <div>
                <div className="h-[185px] w-[375px]">
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
                          ? "-z-2 absolute hidden h-[185px] w-[375px]"
                          : "z-1 absolute flex h-[185px] w-[375px] flex-col items-center justify-center rounded-[18px] border-[1px] border-dashed border-[#6A6A6A]"
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
                      <div className="mt-3 font-IBM-Plex-Mono text-[14px] text-[#6A6A6A]">
                        Upload Picture
                      </div>
                    </div>
                  </label>

                  <div
                    // key={index}
                    className={
                      uploaded
                        ? "z-1 absolute flex h-[185px]   w-[375px] flex-col items-center justify-center overflow-hidden rounded-[18px] border-[1px] border-dashed border-[#6A6A6A]"
                        : " -z-2 absolute hidden h-[185px] w-[375px]"
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
            <div className="mt-10 flex justify-between">
              <div className={uploaded ? "block" : "hidden"}>
                <div
                  className="clickable bg-red cursor-pointer rounded border border-black px-4 py-2 text-black hover:bg-[#FFE072]"
                  onClick={() => {
                    onContinue();
                  }}
                >
                  Submit
                </div>
              </div>
              <div
                className="clickable cursor-pointer rounded bg-black px-4 py-2 text-white hover:bg-red-600"
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
          className="clickable flex h-auto w-auto items-center justify-center overflow-hidden rounded-3xl border-[1px] border-black"
          onClick={() => {
            setShowImage(true), setImageSRC(photosData);
          }}
        >
          <img src={photosData} alt="" srcset="" />
        </div>
      ))}
      <div
        className="clickable flex h-auto w-auto items-center justify-center rounded-3xl border-[1px] border-black p-10"
        onClick={() => {
          setShowImageUpload(true);
        }}
      >
        Upload Image
      </div>
      {showAlert && <Alert alertMsg={alertMsg} closeAlert={closeAlert} />}
    </div>
  );
}
