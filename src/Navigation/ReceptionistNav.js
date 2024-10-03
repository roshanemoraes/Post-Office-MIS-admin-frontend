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
import BlurBackground from "../components/Custom/Background/BlurBackground";
import NormalCourier from "../containers/Receptionist/NormalCourier";
import NormalParcelPost from "../containers/Receptionist/NormalParcelPost";
import GovParcelPost from "../containers/Receptionist/GovParcelPost";
import MoneyOrders from "../containers/Receptionist/MoneyOrders";
import ProfilePage from "../components/ProfilePage";
import PaymentSuccessPage from "../containers/Receptionist/PaymentSuccessPage";
import PaymentFailPage from "../containers/Receptionist/PaymentFailPage";

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
        <NavBar role={"receptionist"} />
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
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/normal-post" element={<PersonalMail />} />
          <Route path="/normal-courier" element={<NormalCourier />} />
          <Route path="/normal-parcel" element={<NormalParcelPost />} />
          <Route path="/gov-parcel" element={<GovParcelPost />} />
          <Route path="/money-order" element={<MoneyOrders />} />
          <Route path="/registered-post" element={<RegisteredPost />} />
          <Route path="/logi-post" element={<LogiPost />} />
          <Route path="/fast-courier" element={<FastCourier />} />
          <Route path="/bulk-mail" element={<BulkMailHome />} />
          <Route path="/customer-mgmt" element={<CustomerMgmt />} />
          <Route path="/money-order/success" element={<PaymentSuccessPage />} />
          <Route path="/money-order/fail" element={<PaymentFailPage />} />
        </Routes>
      </main>
    </div>
  );
}
// const handleSidebarToggle = (isOpen) => {
//   setSideBarOpen(isOpen);
// };

export default ReceptionistInterface;
