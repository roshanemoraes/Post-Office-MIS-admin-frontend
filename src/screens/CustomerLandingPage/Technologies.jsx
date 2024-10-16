import React from "react";
import { RiReactjsLine } from "react-icons/ri";
import { TbBrandNextjs } from "react-icons/tb";
import { SiMongodb } from "react-icons/si";
import { SiSpring } from "react-icons/si";
import { SiPython } from "react-icons/si";
import { SiFlask } from "react-icons/si";
import { SiMysql } from "react-icons/si";
import { SiDocker } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";

const Technologies = () => {
  return (
    <div id="technologies" className="border-b border-neutral-800 pb-24">
      <h1 className="my-20 text-center text-4xl">Technologies</h1>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="rounded-2xl border-4 border-neutral-800 p-4">
          <RiReactjsLine className="text-7xl text-cyan-400" />
        </div>
        <div className="rounded-2xl border-4 border-neutral-800 p-4">
          <TbBrandNextjs className="text-7xl text-white" />
        </div>
        <div className="rounded-2xl border-4 border-neutral-800 p-4">
          <SiMongodb className="text-7xl text-green-500" />
        </div>
        <div className="rounded-2xl border-4 border-neutral-800 p-4">
          <SiMysql className="text-7xl text-blue-500" />
        </div>
        <div className="rounded-2xl border-4 border-neutral-800 p-4">
          <SiSpring className="text-7xl text-green-500" />
        </div>
        <div className="rounded-2xl border-4 border-neutral-800 p-4">
          <SiFlask className="text-7xl text-white" />
        </div>
        <div className="rounded-2xl border-4 border-neutral-800 p-4">
          <FaNodeJs className="text-7xl text-green-500" />
        </div>

        <div className="rounded-2xl border-4 border-neutral-800 p-4">
          <SiPython className="text-7xl text-white-500" />
        </div>
        <div className="rounded-2xl border-4 border-neutral-800 p-4">
          <SiDocker className="text-7xl text-blue-500" />
        </div>
      </div>
    </div>
  );
};

export default Technologies;
