import React, { useState } from "react";
import Dashboard from "../containers/DeliveryManager/Dashboard";
import SideBar from "../containers/DeliveryManager/SideBar";
import { Route, Routes } from "react-router-dom";
import RouteAllocation from "../containers/DeliveryManager/AssignRoute";
import ReturnMailMgmt from "./../containers/DeliveryManager/ReturnMailMgmt";
import NavBar from "../components/NavBar";
import ReturnToSender from "../containers/DeliveryManager/ReturnToSender";
import AddressUpdate from "../containers/DeliveryManager/AddressUpdate";
import DiscardedMails from "../containers/DeliveryManager/DiscardedMails";
import MailsToSort from "../containers/DeliveryManager/MailSortMgmt/MailsToSort";
import InArea from "../containers/DeliveryManager/MailSortMgmt/InArea";
import OutArea from "../containers/DeliveryManager/MailSortMgmt/OutArea";
import BlurBackground from "../components/Custom/Background/BlurBackground";

const DeliveryManagerInterface = () => {
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
          <Route path="/route-allocation" element={<RouteAllocation />} />
          <Route path="/return-mail" element={<ReturnMailMgmt />} />
          <Route
            path="/return-mail/return-to-sender"
            element={<ReturnToSender />}
          />
          <Route
            path="/return-mail/address-update"
            element={<AddressUpdate />}
          />
          <Route
            path="/return-mail/discarded-mail"
            element={<DiscardedMails />}
          />
          <Route path="/mail-sort" element={<MailsToSort />} />
          <Route path="/mail-sort/in-area" element={<InArea />} />
          <Route path="/mail-sort/out-area" element={<OutArea />} />
        </Routes>
      </main>
    </div>
  );
};

export default DeliveryManagerInterface;
