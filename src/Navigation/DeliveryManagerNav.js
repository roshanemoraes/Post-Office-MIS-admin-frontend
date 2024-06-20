import React, { useState } from "react";
import Dashboard from "../containers/DeliveryManager/Dashboard";
import SideBar from "../containers/DeliveryManager/SideBar";
import { Route, Routes } from "react-router-dom";
import RouteAllocation from "../containers/DeliveryManager/AssignRoute";

const DeliveryManagerInterface = () => {
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
          <Route path="/route-allocation" element={<RouteAllocation />} />
        </Routes>
      </main>
    </div>
  );
};

export default DeliveryManagerInterface;
