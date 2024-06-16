import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Login from "./screens/Common/login";
import ReceptionistInterface from "./Navigation/ReceptionistNav";
import PostmasterInterface from "./Navigation/PostmasterNav";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/postmaster/*" element={<PostmasterInterface />} />
      <Route path="/receptionist/*" element={<ReceptionistInterface />} />
    </Routes>
  );
}

export default App;
