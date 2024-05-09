import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiPhone } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [number, setNumber] = useState();
  const [id, setId] = useState();
  const [imageEdit, setImageEdit] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [file, setFile] = useState();
  const [viewFile, setViewFile] = useState();
  const navigate = useNavigate();

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
    <div className="flex h-screen flex-col pl-16 pt-14">
      {imageEdit && (
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
                  onRemove(), setImageEdit(false);
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
      <div className="mr-16 flex max-h-[250px] items-center justify-start overflow-hidden rounded-[28px] font-IBM-Plex-Mono text-[15px]">
        <img src={localStorage.getItem("homeImage")} alt="Not Found" />
        <div
          className="clickable fixed right-16  top-4 h-max w-max  cursor-pointer rounded-md border border-dashed border-black bg-[#FFEEB2] px-3 font-IBM-Plex-Mono text-[18px]"
          onClick={() => {
            setImageEdit(true);
          }}
        >
          EDIT PHOTO
        </div>
      </div>
      <div className="flex flex-col">
        <div className="mt-3 flex w-full flex-row items-center justify-between">
          <div>
            <div className="w-auto font-IBM-Plex-Mono text-[32px] font-semibold">
              {name}
            </div>
            <div className="mt-11 font-IBM-Plex-Mono text-[24px]  text-[#676767]">
              {email}
            </div>
          </div>
          <div className="flex w-max flex-col items-end justify-end pr-14">
            <div className="h-auto w-max rounded-[9px] bg-[#CCFFE0] px-5 font-IBM-Plex-Mono text-[24px] text-[#3C8B5C]">
              {id}
            </div>

            <div className="mt-11 flex w-max items-center font-IBM-Plex-Mono  text-[30px]">
              <div>
                <CiPhone size={30} />
              </div>
              <div>{number}</div>
            </div>
          </div>
        </div>
        <div
          className="mt-11 flex w-max items-center justify-center rounded-xl border-[0.3px] border-black bg-[#FFEEB2] px-5 font-IBM-Plex-Mono text-[30px]"
          onClick={() => {
            navigate("/");
            localStorage.setItem("token", "");
          }}
        >
          Logout
        </div>
      </div>
    </div>
  );
}
