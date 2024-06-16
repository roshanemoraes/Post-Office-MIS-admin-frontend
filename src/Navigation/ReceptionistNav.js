import React, { Component } from "react";
import SideBar from "../containers/Receptionist/SideBar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../containers/Receptionist/Dashboard";
import NormalPost from "../containers/Receptionist/NormalPost";
import RegisteredPost from "../containers/Receptionist/RegisteredPost";
import LogiPost from "../containers/Receptionist/LogiPost";
import FastCourier from "../containers/Receptionist/FastCourier";

function ReceptionistInterface() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "300px auto" }}>
      <SideBar />
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

export default ReceptionistInterface;
