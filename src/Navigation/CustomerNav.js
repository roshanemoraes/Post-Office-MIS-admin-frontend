import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../containers/Customer/Home";
import PendingPost from "../containers/Customer/PendingPost";
import SentPost from "../containers/Customer/SentPost";
import NavBar from "../containers/Customer/NavBar";
import Profile from "../containers/Customer/Profile";
import Settings from "../containers/Customer/Settings";
import UpdateProfile from "../containers/Customer/UpdateProfile";
import SignOut from "./../components/Customer/SignOut";
import BlurBackground from "../components/Custom/Background/BlurBackground";

function CustomerInterface() {
  return (
    <div
      style={{
        display: "grid",
      }}
    >
      <NavBar />
      <BlurBackground />
      <main className="content" style={{ overflowY: "auto", height: "100vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/PendingPost" element={<PendingPost />} />
          <Route path="/SentPost" element={<SentPost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/Signout" element={<SignOut />} />
          <Route path="/profile/updateprofile" element={<UpdateProfile />} />
          <Route path="/PendingPost/SignOut" element={<SignOut />} />
        </Routes>
      </main>
    </div>
  );
}

export default CustomerInterface;
