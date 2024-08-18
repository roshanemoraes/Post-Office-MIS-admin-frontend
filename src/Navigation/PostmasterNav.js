import React, { useState } from "react";
import SideBar from "../containers/Postmaster/SideBar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../containers/Postmaster/Dashboard";
import AddEmployee from "../containers/Postmaster/AddEmployee";
import ListEmployee from "../containers/Postmaster/ListEmployee";
import { TestPrint } from "../containers/Postmaster/TestPrint";
import LiveMap from "../containers/Postmaster/LiveMap";
import BlurBackground from "../components/Custom/Background/BlurBackground";
import NavBar from "../components/NavBar";
import Statistics from "../containers/Postmaster/Charts/Statistics";
import TestPortal from "../containers/Postmaster/TestPortal";

function PostmasterInterface() {
  const [isSideBarOpen, setSideBarOpen] = useState(window.innerWidth >= 1024);

  const handleSidebarToggle = (isOpen) => {
    setSideBarOpen(isOpen);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isSideBarOpen ? "220px auto" : "80px auto",
        gridTemplateRows: "auto 1fr",
      }}
    >
      <SideBar onSidebarToggle={handleSidebarToggle} />
      <div style={{ gridColumn: "2", gridRow: "1" }}>
        <NavBar />
      </div>
      <BlurBackground />
      <main
        className="content"
        style={{
          overflowY: "auto",
          height: "100vh",
          gridColumn: "2",
          gridRow: "2",
        }}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/list-employee" element={<ListEmployee />} />
          <Route path="/live-map" element={<LiveMap />} />
          <Route path="/test" element={<TestPortal />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </main>
    </div>
  );
}

export default PostmasterInterface;
