import React, { useState } from "react";
import SideBar from "../containers/Postmaster/SideBar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../containers/Postmaster/Dashboard";
import AddEmployee from "../containers/Postmaster/AddEmployee";
import ListEmployee from "../containers/Postmaster/ListEmployee";
import { TestPrint } from "../containers/Postmaster/TestPrint";

function PostmasterInterface() {
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
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/list-employee" element={<ListEmployee />} />
          <Route path="/test" element={<TestPrint />} />
        </Routes>
      </main>
    </div>
  );
}

export default PostmasterInterface;
