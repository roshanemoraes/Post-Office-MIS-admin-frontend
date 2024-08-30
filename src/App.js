import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./screens/Common/login";
import ReceptionistInterface from "./Navigation/ReceptionistNav";
import PostmasterInterface from "./Navigation/PostmasterNav";
import DeliveryManagerInterface from "./Navigation/DeliveryManagerNav";
import OutArea from "./containers/DeliveryManager/MailSortMgmt/OutArea";
import LoginNew from "./screens/Common/loginNew";
import ProtectedRoute from "./Navigation/ProtectedRoutes";
import UnauthorizedPage from "./screens/Common/UnauthorizedPage";

function App() {
  return (
    <Routes>
      <Route path="/admin/" element={<Navigate to="/admin/login" />} />
      <Route path="/admin/sign" element={<LoginNew />} />

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
          <ProtectedRoute
            element={PostmasterInterface}
            allowedRoles={["ROLE_ADMIN"]}
          />
        }
      />

      <Route
        path="/admin/receptionist/*"
        element={
          <ProtectedRoute
            element={ReceptionistInterface}
            allowedRoles={["ROLE_USER"]}
          />
        }
      />
      <Route
        path="/admin/delivery-manager/*"
        element={
          <ProtectedRoute
            element={DeliveryManagerInterface}
            allowedRoles={["ROLE_MANAGER"]}
          />
        }
      />
      <Route path="*" element={<Navigate to="/unauthorized" />} />
    </Routes>
  );
}

export default App;
