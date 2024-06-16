import React, { Component, useState } from "react";
import SideBar from "../containers/Receptionist/SideBar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../containers/Receptionist/Dashboard";
import NormalPost from "../containers/Receptionist/NormalPost";
import RegisteredPost from "../containers/Receptionist/RegisteredPost";
import LogiPost from "../containers/Receptionist/LogiPost";
import FastCourier from "../containers/Receptionist/FastCourier";

function ReceptionistInterface() {
  const [isSideBarOpen, setSideBarOpen] = useState(window.innerWidth >= 1024);

  const handleSidebarToggle = (isOpen) => {
    setSideBarOpen(isOpen);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isSideBarOpen ? "260px auto" : "80px auto",
      }}
    >
      <SideBar onSidebarToggle={handleSidebarToggle} />
      <main className="content" style={{ overflowY: "auto", height: "100vh" }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/normal-post" element={<NormalPost />} />
          <Route path="/registered-post" element={<RegisteredPost />} />
          <Route path="/logi-post" element={<LogiPost />} />
          <Route path="/fast-courier" element={<FastCourier />} />
        </Routes>
      </main>
    </div>
  );
}
// const handleSidebarToggle = (isOpen) => {
//   setSideBarOpen(isOpen);
// };

export default ReceptionistInterface;
