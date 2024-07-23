import React, { useState } from "react";
import SideBar from "../containers/Receptionist/SideBar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../containers/Receptionist/Dashboard";
import RegisteredPost from "../containers/Receptionist/RegisteredPost";
import LogiPost from "../containers/Receptionist/LogiPost";
import FastCourier from "../containers/Receptionist/FastCourier";
import PersonalMail from "../containers/Receptionist/PersonalMail";
import NavBar from "../components/NavBar";
import BulkMailHome from "../containers/Receptionist/BulkMailMgmt/BulkMailHome";
import CustomerMgmt from "../containers/Receptionist/CustomerMgmt";

function ReceptionistInterface() {
  const [isSideBarOpen, setSideBarOpen] = useState(window.innerWidth >= 1150);

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
          <Route path="/normal-post" element={<PersonalMail />} />
          <Route path="/registered-post" element={<RegisteredPost />} />
          <Route path="/logi-post" element={<LogiPost />} />
          <Route path="/fast-courier" element={<FastCourier />} />
          <Route path="/bulk-mail" element={<BulkMailHome />} />
          <Route path="/customer-mgmt" element={<CustomerMgmt />} />
        </Routes>
      </main>
    </div>
  );
}
// const handleSidebarToggle = (isOpen) => {
//   setSideBarOpen(isOpen);
// };

export default ReceptionistInterface;
