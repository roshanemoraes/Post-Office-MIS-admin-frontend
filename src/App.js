import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./screens/Common/login";
import ReceptionistInterface from "./Navigation/ReceptionistNav";
import PostmasterInterface from "./Navigation/PostmasterNav";
import DeliveryManagerInterface from "./Navigation/DeliveryManagerNav";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/postmaster/*" element={<PostmasterInterface />} />
      <Route path="/receptionist/*" element={<ReceptionistInterface />} />
      <Route
        path="/delivery-manager/*"
        element={<DeliveryManagerInterface />}
      />
    </Routes>
  );
}

export default App;
