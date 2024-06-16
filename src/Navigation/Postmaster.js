import React, { Component } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import SideBar from "../containers/Postmaster/SideBar";

const Postmaster = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "285px auto" /* Adjust the value based on the width of your SideBar */,
        height: "100vh",
      }}
    >
      <SideBar />
      <div>
        <div style={{ marginLeft: "0px" }}>Postmaster</div>
      </div>
    </div>
  );
};

export default Postmaster;
