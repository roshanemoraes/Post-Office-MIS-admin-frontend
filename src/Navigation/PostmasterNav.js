import React from "react";
import SideBar from "../containers/Postmaster/SideBar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../containers/Postmaster/Dashboard";
import AddEmployee from "../containers/Postmaster/AddEmployee";
import ListEmployee from "../containers/Postmaster/ListEmployee";

function PostmasterInterface() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "300px auto" }}>
      <SideBar />
      <main className="content" style={{ overflowY: "auto", height: "100vh" }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/list-employee" element={<ListEmployee />} />
        </Routes>
      </main>
    </div>
  );
}

export default PostmasterInterface;
