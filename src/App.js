import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./screens/Common/AdminLogin";
import ReceptionistInterface from "./Navigation/ReceptionistNav";
import PostmasterInterface from "./Navigation/PostmasterNav";
import DeliveryManagerInterface from "./Navigation/DeliveryManagerNav";
import OutArea from "./containers/DeliveryManager/MailSortMgmt/OutArea";
import ProtectedRouteAdmin from "./Navigation/ProtectedRouteAdmin";
import UnauthorizedPage from "./screens/Common/UnauthorizedPage";
import CustomerLogin from "./screens/Common/CustomerLogin";
import CustomerInterface from "./Navigation/CustomerNav";
import TestLogin from "./screens/Common/TestLogin";
import LandingInterface from "./Navigation/LandingPageNav";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/testlogin" element={<LandingInterface />} />
        <Route path="/login" element={<CustomerLogin />} />

        <Route path="/customer/*" element={<CustomerInterface />} />

        <Route path="/admin/" element={<Navigate to="/admin/login" />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* <Route path="/postmaster/*" element={<PostmasterInterface />} /> */}
        {/* <Route path="/receptionist/*" element={<ReceptionistInterface />} />
      <Route
        path="/delivery-manager/*"
        element={<DeliveryManagerInterface />}
      /> */}
        <Route
          path="/admin/postmaster/*"
          element={
            <ProtectedRouteAdmin
              element={PostmasterInterface}
              allowedRoles={["ROLE_POSTMASTER"]}
            />
          }
        />

        <Route
          path="/admin/receptionist/*"
          element={
            <ProtectedRouteAdmin
              element={ReceptionistInterface}
              allowedRoles={["ROLE_RECEPTIONIST"]}
            />
          }
        />
        <Route
          path="/admin/delivery-manager/*"
          element={
            <ProtectedRouteAdmin
              element={DeliveryManagerInterface}
              allowedRoles={["ROLE_MANAGER"]}
            />
          }
        />
        <Route path="*" element={<Navigate to="/unauthorized" />} />
      </Routes>
    </>
  );
}

export default App;
