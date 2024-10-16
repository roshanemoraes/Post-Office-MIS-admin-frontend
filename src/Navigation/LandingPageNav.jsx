import React from "react";
import { Route, Routes } from "react-router-dom";
import TestLogin from "../screens/Common/TestLogin";

function LandingInterface() {
  return (
    <div
      style={{
        display: "grid",
      }}
    >
      <main className="content" style={{ overflowY: "auto", height: "100vh" }}>
        <Routes>
          <Route path="/" element={<TestLogin />} />
        </Routes>
      </main>
    </div>
  );
}

export default LandingInterface;
