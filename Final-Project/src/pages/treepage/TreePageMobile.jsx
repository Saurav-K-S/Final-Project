import axios from "axios";
import React, { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import { useParams } from "react-router-dom";

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

const renderCustomNode = ({ nodeDatum, toggleNode }) => {
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
        className="stroke-[0.8px] font-IBM-Plex-Mono text-[14px] font-medium"
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
        className="stroke-none text-center font-IBM-Plex-Mono text-[11px] font-medium"
      >
        {nodeDatum.id}
      </text>
    </g>
  );
};

export default function TreePageMobile() {
  const { userId } = useParams();
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    console.log(userId);
    axios
      .get(
        "https://ancestree-backend.onrender.com/api/v1/family/treeMobile/" +
          userId
      )
      .then((response) => {
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

  return (
    <div
      id="treeWrapper"
      className="border-line flex h-screen w-screen items-center justify-center"
    >
      <Tree
        collapsible={true}
        translate={{ x: screen.width / 2, y: 200 }}
        data={chartData}
        pathFunc={"step"}
        orientation="vertical"
        separation={{ siblings: 2, nonSiblings: 2 }}
        initialDepth={0}
        depthFactor={300}
        enableLegacyTransitions={true}
        renderCustomNodeElement={(rd3tProps) => renderCustomNode(rd3tProps)}
      />
    </div>
  );
}
