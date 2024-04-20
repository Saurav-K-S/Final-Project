import axios from "axios";
import React, { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import { format, differenceInYears } from "date-fns";
import { CiPhone } from "react-icons/ci";

const formatDate = (dateString) => {
  if (dateString==null) {
    return""
  }
  const date = new Date(dateString);
  return format(date, "dd/MM/yyyy");
};

const calculateAge = (dateString0,dateString1) => {
  if (dateString0==null) {
    return ""
  }
  if (dateString1==null) {
    
    const birthDate = new Date(dateString0);
    const age = differenceInYears(new Date(), birthDate);
    return age.toString();
  }else{
    const birthDate0 = new Date(dateString0);
    const birthDate1 = new Date(dateString1);
    const age = differenceInYears(birthDate1, birthDate0);
    return age.toString();
    
  }
};

let orgChart = {
  name: "Adam Doe",
  gender: "male",
  attributes: {
    id: "1",
  },
  children: [
    {
      name: "Philip Baker Doe",
      attributes: {
        id: "1.1",
      },
      children: [
        { name: "Clark Baker", attributes: { id: "1.1.1" } },
        { name: "Mary Baker", attributes: { id: "1.1.2" } },
      ],
    },
    {
      name: "Irwin Hills Doe",
      attributes: {
        id: "1.2",
      },
      children: [
        { name: "Mason Hills", attributes: { id: "1.2.1" } },
        { name: "Davis Hills", attributes: { id: "1.2.2" } },
      ],
    },
    {
      name: "Thomas Jones Doe",
      attributes: {
        id: "1.3",
      },
      children: [
        { name: "Phillipa Jones", attributes: { id: "1.3.1" } },
        { name: "Yennefer Jones", attributes: { id: "1.3.2" } },
      ],
    },
    {
      name: "Bruce Wayne Doe",
      attributes: {
        id: "1.4",
      },
      children: [
        {
          name: "Thomas Wayne",
          attributes: { id: "1.4.1" },
          children: [{ name: "Thomas", attributes: { id: "1.4.1" } }],
        },
        { name: "Charles Wayne", attributes: { id: "1.4.2" } },
      ],
    },
  ],
};

const renderCustomNode = (
  { nodeDatum, toggleNode },
  setDisplayMember,
  displayMember,
  setShowCard
) => {
  function renderDiv() {
    axios
      .get(
        "https://ancestree-backend.onrender.com/api/v1/member/view/" +
          nodeDatum.id,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(function (response) {
        console.log(response);
        setShowCard(true);
        setDisplayMember({
          ...displayMember,
          name: response.data.member.name,
          id: response.data.member.memberId,
          birthOrder: response.data.member.birthOrder,
          father: response.data.member.father,
          dob: response.data.member.dob,
          dod: response.data.member.dod,
          bloodGroup: response.data.member.bloodGroup,
          WmobileNumber: response.data.member.WmobileNumber,
          spouse: response.data.member.spouse,
          occupation: response.data.member.occupation,
          noOfChildren: response.data.member.noOfChildren,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <g id={nodeDatum.name + "_id"} className="stroke-[1px]">
      <circle
        r={35}
        className="fill-[#FFEEB2] stroke-black stroke-[0.2px]"
        // onClick={() => toggleNode()}
        onClick={toggleNode}
        // onDoubleClick={ }
      />
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"></svg>
      <rect
        x={33}
        y={-53  }
        width={95}
        // width="160"
        height="30"
        rx="18"
        ry="18"
        fill="#FEFFDD"
        className="z-50 stroke-current stroke-[0.5px]"
        onClick={renderDiv}
      />
      <text
        x={45}
        y={-35}
        fill="#000000"
        className="font-IBM-Plex-Mono font-medium text-[10px] stroke-[0.8px]"
        onClick={renderDiv}
      >
        Show Details
      </text>
      <rect
        x={33}
        y={2}
        width={155}
        // width="160"
        height="60"
        rx="18"
        ry="18"
        fill="#FEFFDD"
        className="stroke-current stroke-[0.5px]"
      />
      <text
        x={45}
        y={22}
        fill="#000000"
        className="font-IBM-Plex-Mono font-medium text-[14px] stroke-[0.8px]"
      >
        {nodeDatum.name}
      </text>
      <rect
        x={40}
        y={33}
        width={100}
        height="20"
        rx="9"
        ry="9"
        fill="#CCFFE0"
        className="stroke-none"
      />
      <text
        x={46}
        y={47}
        width="auto"
        height="20"
        fill="#3C8B5C"
        className="font-IBM-Plex-Mono font-medium text-[11px] stroke-none text-center"
      >
        {nodeDatum.id}
      </text>
    </g>
  );
};

export default function TreePage() {
  const [chartData, setChartData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [showSearchName, setShowSearchName] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [nameList, setNameList] = useState([]);
  const [memberSearch, setMemberSearch] = useState();
  const [memberDetails, setMemberDetails] = useState({
    self: true,
    name: "",
    WmobileNumber: "",
    email: "",
    parentId: "",
    dob: "",
    dod: "",
    bloodGroup: "",
    alterMobileNumber: "",
    spouse: "",
    father: "",
    occupation: "",
    address: "",
    birthOrder: 0,
    gender: 1,
    noOfChildren: 0,
  });
  const [displayMember, setDisplayMember] = useState({
    name: "",
    id: "",
    birthOrder: null,
    father: "",
    dob: "",
    dod: "",
    bloodGroup: "",
    WmobileNumber: "",
    spouse: null,
    occupation: "",
    noOfChildren: 0,
  });
  useEffect(() => {
    axios
      .get("https://ancestree-backend.onrender.com/api/v1/family/tree", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(async (response) => {
        console.log(response.data);
        if (response.data.success) {
          setChartData(response.data.tree);
        }
      })
      .catch((error) => {
        console.error("Error :", error);
        // Handle error response if needed
      });
  }, []);

  function submitMember() {
    console.log(memberDetails.noOfChildren);
    axios
      .post(
        "https://ancestree-backend.onrender.com/api/v1/member/create",
        memberDetails,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          setIsModalOpen(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  function editMember(memberDetails, id, setIsEditOpen) {
    axios
      .put(
        "https://ancestree-backend.onrender.com/api/v1/member/edit",
        {
          email: memberDetails.email,
          dob: memberDetails.dob,
          alterMobileNumber: memberDetails.alterMobileNumber,
          spouse: memberDetails.spouse,
          occupation: memberDetails.occupation,
          address: memberDetails.address,
          noOfChildren: memberDetails.noOfChildren,
          memberId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          setIsEditOpen(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  function searchMember() {
    console.log("HIIIIII");
    axios
      .get(
        "https://ancestree-backend.onrender.com/api/v1/member/search/" +
          memberSearch,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(function (response) {
        console.log(response);
        // Close the form
        setChartData(response.data.memberPath);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function refreshTree() {
    axios
      .get("https://ancestree-backend.onrender.com/api/v1/family/tree", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(async (response) => {
        console.log(response.data);
        if (response.data.success) {
          setChartData(response.data.tree);
        }
      })
      .catch((error) => {
        console.error("Error :", error);
        // Handle error response if needed
      });
  }

  function searchMemberName() {
    axios
      .post(
        "https://ancestree-backend.onrender.com/api/v1/member/search/pattern",
        { pattern: searchName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          setNameList(response.data.memberList);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  return (
    <div id="treeWrapper" className="h-screen border-line">
      <div className="fixed top-[5%] right-[3%] flex items-end justify-end">
        <div className="mt-[20px]">
          <div className="w-[425px] text-[14px] font-IBM-Plex-Mono">
            Input ID
          </div>
          <div>
            <input
              onChange={(e) => setMemberSearch(e.target.value)}
              className="bg-[#FEFFDD] border-[0.1px] border-black border-dashed rounded-[18px] w-[380px]  h-[52px] p-3 mt-[9px]"
              type="text"
            />
          </div>
        </div>
        <div
          className="clickable w-max h-max py-3 px-3 border-[1px] border-black border-dashed rounded-xl font-IBM-Plex-Mono"
          onClick={() => {
            searchMember();
          }}
        >
          Search
        </div>
        <div
          className="clickable w-max h-max py-3 px-3 border-[1px] border-black border-dashed rounded-xl font-IBM-Plex-Mono"
          onClick={() => {
            refreshTree();
          }}
        >
          Refresh
        </div>
      </div>
      <Tree
        collapsible={true}
        translate={{ x: 525, y: 200 }}
        data={chartData}
        pathFunc={"step"}
        orientation="vertical"
        separation={{ siblings: 2, nonSiblings: 2 }}
        initialDepth={0}
        depthFactor={300 }
        enableLegacyTransitions={true}
        renderCustomNodeElement={(rd3tProps) =>
          renderCustomNode(
            rd3tProps,
            setDisplayMember,
            displayMember,
            setShowCard
          )
        }
      />
      {showCard && (
        <div className="fixed bottom-20 right-10 w-[400px] h-max bg-[#FEFFDD] border border-black border-dashed font-IBM-Plex-Mono p-8 rounded-3xl overflow-y-scroll scrollbar-none px-10">
          <div className="flex justify-between">
            <div className="flex flex-col justify-between items-start">
              <div className="text-[28px] font-semibold">
                {displayMember.name}
              </div>
              <div className="text-[15px] flex  text-[#676767]">
                <div className="text-[#676767]">Member ID:</div>
                <div className="text-[16px] ml-3 px-3 text-[#3C8B5C] flex justify-center bg-[#CCFFE0] rounded-lg">
                  {displayMember.id}
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div
                className="h-min py-1 px-3 rounded-lg bg-[#67676733]"
                onClick={() => setIsEditOpen(true)}
              >
                EDIT
              </div>
              <div
                className="h-min py-1 px-3 rounded-lg bg-black text-white cursor-pointer"
                onClick={() => setShowCard(false)}
              >
                CLOSE
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="bg-[#FFEEB2] w-max px-3 py-2 border border-black border-dashed  mt-3 rounded-lg flex flex-col justify-center items-start">
              <div className="text-[#676767]">Birth Order:</div>
              <div className="font-semibold">{displayMember.birthOrder}</div>
            </div>
            <div className="w-max px-3 py-2  rounded-lg flex flex-col justify-center items-start">
              <div className="text-[#676767]">Father's Name:</div>
              <div className="font-semibold">{displayMember.father}</div>
            </div>
            <div className="w-max px-3 py-2  mt-3 rounded-lg flex flex-col justify-center items-start">
              <div className="text-[#676767]">DOB:</div>
              <div className="font-semibold">
                {formatDate(displayMember.dob)}
              </div>
            </div>
            <div className="w-max px-3 py-2  rounded-lg flex flex-col justify-center items-start">
              <div className="text-[#676767]">Phone Number:</div>
              <div className="font-semibold">{displayMember.WmobileNumber}</div>
            </div>
            <div className="w-max px-3 py-2  mt-3 rounded-lg flex flex-col justify-center items-start">
              <div className="text-[#676767]">Age:</div>
              <div className="font-semibold">
                {calculateAge(displayMember.dob,displayMember.dod)}
              </div>
            </div>
            <div className="w-max px-3 py-2  rounded-lg flex flex-col justify-center items-start">
              <div className="text-[#676767]">Spouse</div>
              <div className="font-semibold">{displayMember.spouse}</div>
            </div>
            {/* <div className="w-max px-3 py-2  mt-3 rounded-lg flex flex-col justify-center items-start">
              <div className="text-[#676767]">Dead:</div>
              <div className="font-semibold">14/11/2023</div>
            </div> */}
            <div className="w-max px-3 py-2  rounded-lg flex flex-col justify-center items-start">
              <div className="text-[#676767]">Occupation</div>
              <div className="font-semibold">{displayMember.occupation}</div>
            </div>
            <div className="w-max px-3 py-2  rounded-lg flex flex-col justify-center items-start">
              <div className="text-[#676767]">Date of Death</div>
              <div className="font-semibold">{formatDate(displayMember.dod) }</div>
            </div>
            <div className="w-max px-3 py-2  rounded-lg flex flex-col justify-center items-start">
              <div className="text-[#676767]">Blood Group</div>
              <div className="font-semibold">{displayMember.bloodGroup}</div>
            </div>
            <div className="w-max px-3 py-2  mt-3 rounded-lg flex flex-col justify-center items-start">
              <div className="text-[#676767] w-min">Number of Children:</div>
              <div className="font-semibold">{displayMember.noOfChildren}</div>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="w-[500px] h-[500px] bg-[#FFEEB2] font-IBM-Plex-Mono p-8 rounded-lg overflow-y-scroll scrollbar-none">
            <h2 className="text-2xl font-bold mb-4">Add Member</h2>
            {/* Form inputs */}
            <label className="block mb-4">
              <input
                type="radio"
                value="self"
                checked={memberDetails.self}
                onChange={(e) =>
                  setMemberDetails({ ...memberDetails, self: true })
                }
              />
              Myself
            </label>
            <label className="block mb-4">
              <input
                type="radio"
                value="other"
                checked={!memberDetails.self}
                className="bg-black"
                onChange={() =>
                  setMemberDetails({ ...memberDetails, self: false })
                }
              />
              Other Member
            </label>
            <label className="block mb-4">
              Name:
              <input
                type="text"
                value={memberDetails.name}
                onChange={(e) =>
                  setMemberDetails({ ...memberDetails, name: e.target.value })
                }
                placeholder="Enter name"
                className="block w-full mb-4 border border-gray-300 p-2 rounded"
              />
            </label>
            <label className="block mb-4">
              WhatsApp Mobile Number:
              <input
                type="text"
                value={memberDetails.WmobileNumber}
                onChange={(e) =>
                  setMemberDetails({
                    ...memberDetails,
                    WmobileNumber: e.target.value,
                  })
                }
                placeholder="Enter WhatsApp mobile number"
                className="block w-full mb-4 border border-gray-300 p-2 rounded"
              />
            </label>
            <label className="block mb-4">
              Email:
              <input
                type="text"
                value={memberDetails.email}
                onChange={(e) =>
                  setMemberDetails({
                    ...memberDetails,
                    email: e.target.value,
                  })
                }
                placeholder="Enter EMail"
                className="block w-full mb-4 border border-gray-300 p-2 rounded"
              />
            </label>
            <label className="block mb-4">
              Parent ID:
              <input
                type="text"
                value={memberDetails.parentId}
                onChange={(e) =>
                  setMemberDetails({
                    ...memberDetails,
                    parentId: e.target.value,
                  })
                }
                placeholder="Enter Parent ID"
                className="block w-full mb-4 border border-gray-300 p-2 rounded"
              />
            </label>
            <label className="block mb-4">
              Date Of Birth:
              <input
                type="text"
                value={memberDetails.dob}
                onChange={(e) =>
                  setMemberDetails({
                    ...memberDetails,
                    dob: e.target.value,
                  },
                console.log(e.target.value))
                }
                placeholder="Enter Date Of Birth"
                className="block w-full mb-4 border border-gray-300 p-2 rounded"
              />
            </label>
                <label className="block mb-4">
                  Date Of Death:
                  <input
                    type="text"
                    value={memberDetails.dod}
                    onChange={(e) =>
                      setMemberDetails({
                        ...memberDetails,
                        dod: e.target.value,
                      },
                      console.log(e.target.value))
                    }
                    placeholder="Enter Date Of Death"
                    className="block w-full mb-4 border border-gray-300 p-2 rounded"
                  />
                </label>
            <label className="block mb-4">
              Blood Group:
              <input
                type="text"
                value={memberDetails.bloodGroup}
                onChange={(e) =>
                  setMemberDetails({
                    ...memberDetails,
                    bloodGroup: e.target.value,
                  })
                }
                placeholder="Enter the Blood group"
                className="block w-full mb-4 border border-gray-300 p-2 rounded"
              />
            </label>
            <label className="block mb-4">
              Alternate Mobile:
              <input
                type="text"
                value={memberDetails.alterMobileNumber}
                onChange={(e) =>
                  setMemberDetails({
                    ...memberDetails,
                    alterMobileNumber: e.target.value,
                  })
                }
                placeholder="Enter Alternate mobile number"
                className="block w-full mb-4 border border-gray-300 p-2 rounded"
              />
            </label>
            <label className="block mb-4">
              Spouse:
              <input
                type="text"
                value={memberDetails.spouse}
                onChange={(e) =>
                  setMemberDetails({
                    ...memberDetails,
                    spouse: e.target.value,
                  })
                }
                placeholder="Enter Spouse Name"
                className="block w-full mb-4 border border-gray-300 p-2 rounded"
              />
            </label>
            <label className="block mb-4">
              Father's Name:
              <input
                type="text"
                value={memberDetails.father}
                onChange={(e) =>
                  setMemberDetails({
                    ...memberDetails,
                    father: e.target.value,
                  })
                }
                placeholder="Enter Father Name"
                className="block w-full mb-4 border border-gray-300 p-2 rounded"
              />
            </label>
            <label className="block mb-4">
              Occupation:
              <input
                type="text"
                value={memberDetails.occupation}
                onChange={(e) =>
                  setMemberDetails({
                    ...memberDetails,
                    occupation: e.target.value,
                  })
                }
                placeholder="Enter Occupation"
                className="block w-full mb-4 border border-gray-300 p-2 rounded"
              />
            </label>
            <label className="block mb-4">
              Address:
              <input
                type="text"
                value={memberDetails.address}
                onChange={(e) =>
                  setMemberDetails({
                    ...memberDetails,
                    address: e.target.value,
                  })
                }
                placeholder="Enter Address"
                className="block w-full mb-4 border border-gray-300 p-2 rounded"
              />
            </label>
            <label className="block mb-4">
              Birth Order:
              <input
                type="number"
                value={memberDetails.birthOrder}
                onChange={(e) =>
                  setMemberDetails({
                    ...memberDetails,
                    birthOrder: e.target.value,
                  })
                }
                placeholder="Enter the birth order"
                className="block w-full mb-4 border border-gray-300 p-2 rounded"
              />
            </label>
            <label className="block mb-4">
              Gender:
              <select
                value={memberDetails.gender}
                onChange={(e) =>
                  setMemberDetails({
                    ...memberDetails,
                    gender: e.target.value,
                  })
                }
                className="block w-full border border-gray-300 p-2 rounded"
              >
                <option value={1}>Male</option>
                <option value={0}>Female</option>
              </select>
            </label>
            <label className="block mb-4">
              Number of Children:
              <input
                type="number"
                value={memberDetails.noOfChildren}
                onChange={(e) =>
                  setMemberDetails({
                    ...memberDetails,
                    noOfChildren: e.target.value,
                  })
                }
                placeholder="Enter number of children"
                className="block w-full mb-4 border border-gray-300 p-2 rounded"
              />
            </label>
            <div className="flex justify-between">
              <button
                onClick={submitMember}
                className="bg-[#FFE072] text-black px-4 py-2 rounded hover:bg-[#FFE072]"
              >
                Submit
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-black text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {isEditOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="w-[500px] h-[500px] bg-[#FFEEB2] font-IBM-Plex-Mono p-8 rounded-lg overflow-y-scroll scrollbar-none">
            <h2 className="text-2xl font-bold mb-4">Edit Member</h2>
            {/* Form inputs */}

            <label className="block mb-4">
              Email:
              <input
                type="text"
                value={memberDetails.email}
                onChange={(e) =>
                  setMemberDetails({
                    ...memberDetails,
                    email: e.target.value,
                  })
                }
                placeholder="Enter EMail"
                className="block w-full mb-4 border border-gray-300 p-2 rounded"
              />
            </label>

            <label className="block mb-4">
              Date Of Birth:
              <input
                type="text"
                value={memberDetails.dob}
                onChange={(e) =>
                  setMemberDetails({
                    ...memberDetails,
                    dob: e.target.value,
                  })
                }
                placeholder="Enter Date Of Birth"
                className="block w-full mb-4 border border-gray-300 p-2 rounded"
              />
            </label>
            <label className="block mb-4">
              Alternate Mobile:
              <input
                type="text"
                value={memberDetails.alterMobileNumber}
                onChange={(e) =>
                  setMemberDetails({
                    ...memberDetails,
                    alterMobileNumber: e.target.value,
                  })
                }
                placeholder="Enter Alternate mobile number"
                className="block w-full mb-4 border border-gray-300 p-2 rounded"
              />
            </label>
            <label className="block mb-4">
              Spouse:
              <input
                type="text"
                value={memberDetails.spouse}
                onChange={(e) =>
                  setMemberDetails({
                    ...memberDetails,
                    spouse: e.target.value,
                  })
                }
                placeholder="Enter Spouse Name"
                className="block w-full mb-4 border border-gray-300 p-2 rounded"
              />
            </label>

            <label className="block mb-4">
              Occupation:
              <input
                type="text"
                value={memberDetails.occupation}
                onChange={(e) =>
                  setMemberDetails({
                    ...memberDetails,
                    occupation: e.target.value,
                  })
                }
                placeholder="Enter Occupation"
                className="block w-full mb-4 border border-gray-300 p-2 rounded"
              />
            </label>
            <label className="block mb-4">
              Address:
              <input
                type="text"
                value={memberDetails.address}
                onChange={(e) =>
                  setMemberDetails({
                    ...memberDetails,
                    address: e.target.value,
                  })
                }
                placeholder="Enter Address"
                className="block w-full mb-4 border border-gray-300 p-2 rounded"
              />
            </label>

            <label className="block mb-4">
              Number of Children:
              <input
                type="number"
                value={memberDetails.noOfChildren}
                onChange={(e) =>
                  setMemberDetails({
                    ...memberDetails,
                    noOfChildren: e.target.value,
                  })
                }
                placeholder="Enter number of children"
                className="block w-full mb-4 border border-gray-300 p-2 rounded"
              />
            </label>
            <div className="flex justify-between">
              <button
                onClick={() =>
                  editMember(memberDetails, displayMember.id, setIsEditOpen)
                }
                className="bg-[#FFE072] text-black px-4 py-2 rounded hover:bg-[#FFE072]"
              >
                Submit
              </button>
              <button
                onClick={() => setIsEditOpen(false)}
                className="bg-black text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {showSearchName && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="w-full h-[90%] mx-60  bg-[#FFEEB2] font-IBM-Plex-Mono p-8 rounded-lg overflow-y-scroll scrollbar-none">
            <h2 className="text-2xl font-bold mb-4">Search Member by Name:</h2>
            {/* Form inputs */}

            <label className="block mb-4">
              Name:
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Enter Name"
                className="block w-full mb-4 border border-gray-300 p-2 rounded"
              />
            </label>
            <div className="grid grid-cols-2 gap-x-3 gap-y-2">

            {nameList.map((nameData, index) => (
              <div className="py-4 mb-3 px-4 w-full flex flex-col justify-center items-center border-[1px] border-black border-dashed rounded-3xl">
                <div className="w-full flex justify-between items-center">
                  <div>{nameData.name}</div>
                  <div className="bg-[#CCFFE0] text-[#3C8B5C] rounded-[9px] px-5">{nameData.memberId}</div>
                </div>
                <div className="mt-2 w-full flex justify-end items-center">
                  
                  <div className="flex items-center"><CiPhone  size={20} />{nameData.WmobileNumber}</div>
                </div>
              </div>
            ))}
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => searchMemberName()}
                className="bg-[#FFE072] text-black px-4 py-2 rounded hover:bg-[#FFE072]"
              >
                Submit
              </button>
              <button
                onClick={() => setShowSearchName(false)}
                className="bg-black text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="fixed text-[20px] bottom-4 right-4 font-semibold  text-black font-IBM-Plex-Mono flex flex-col">
        <button
          onClick={() => setIsModalOpen(true)}
          className="clickable px-10 py-2 rounded-3xl hover:[#FFE072] shadow-inner bg-[#FFEEB2] "
        >
          Add Member
        </button>
        <button
          onClick={() => setShowSearchName(true)}
          className="clickable px-10 py-2 rounded-3xl hover:[#FFE072] shadow-inner bg-[#FFEEB2] mt-5"
        >
          Search Member
        </button>
      </div>
    </div>
  );
}
