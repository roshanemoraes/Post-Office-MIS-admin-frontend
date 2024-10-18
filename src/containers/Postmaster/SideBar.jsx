import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.css";

const SideBar = ({ onSidebarToggle }) => {
  const [isSideBarOpen, setSideBarOpen] = useState(window.innerWidth >= 1150);
  const [isSubMenuOpen, setSubMenuOpen] = useState(Array(2).fill(true));
  const location = useLocation();

  const handleSidebarToggle = () => {
    if (window.innerWidth < 1150) {
      setSideBarOpen(false);
      onSidebarToggle(false);
    } else {
      setSideBarOpen(!isSideBarOpen);
      onSidebarToggle(!isSideBarOpen);
    }
  };

  const handleSubMenuToggle = (index) => {
    const newSubMenuOpen = [...isSubMenuOpen];
    newSubMenuOpen[index] = !newSubMenuOpen[index];
    setSubMenuOpen(newSubMenuOpen);
  };

  const isActiveLink = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div>
      <div className={`sidebar ${isSideBarOpen ? "" : "close"}`}>
        <div className={`logo-details ${isSideBarOpen ? "" : "close"}`}>
          <i className="bx bx-menu" onClick={handleSidebarToggle}></i>
          <span className="logo_name">SL POST</span>
        </div>
        <ul className={`nav-links ${isSideBarOpen ? "" : "close"}`}>
          <li className={isActiveLink("/admin/postmaster/")}>
            <Link to="/admin/postmaster/">
              <i className="bx bx-grid-alt"></i>
              <span className="link_name">DASHBOARD</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="/admin/postmaster/">
                  DASHBOARD
                </Link>
              </li>
            </ul>
          </li>
          <li className={isActiveLink("/admin/postmaster/statistics")}>
            <Link to="/admin/postmaster/statistics">
              <i className="bx bx-stats"></i>
              <span className="link_name">STATISTICS</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="/admin/postmaster/statistics">
                  STATISTICS
                </Link>
              </li>
            </ul>
          </li>
          <li className={isActiveLink("/admin/postmaster/financial-mgmt")}>
            <Link to="/admin/postmaster/financial-mgmt">
              <i className="bx bx-dollar-circle"></i>
              <span className="link_name">FINANCIAL MGMT</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link
                  className="link_name"
                  to="/admin/postmaster/financial-mgmt"
                >
                  FINANCIAL MGMT
                </Link>
              </li>
            </ul>
          </li>
          <li className={isActiveLink("/admin/postmaster/live-map")}>
            <Link to="/admin/postmaster/live-map">
              <i className="bx bxs-map"></i>
              <span className="link_name">LIVE MAP</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="/admin/postmaster/live-map">
                  LIVE MAP
                </Link>
              </li>
            </ul>
          </li>
          <li className={isActiveLink("/admin/postmaster/add-employee")}>
            <Link to="/admin/postmaster/add-employee">
              <i className="bx bxs-user"></i>
              <span className="link_name">ADD EMPLOYEE</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="/admin/postmaster/add-employee">
                  ADD EMPLOYEE
                </Link>
              </li>
            </ul>
          </li>
          <li className={isActiveLink("/admin/postmaster/list-employee")}>
            <Link to="/admin/postmaster/list-employee">
              <i className="bx bx-list-ul"></i>
              <span className="link_name">LIST EMPLOYEES</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link
                  className="link_name"
                  to="/admin/postmaster/list-employee"
                >
                  LIST EMPLOYEES
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <div className="profile-details">
              <div className="profile-content"></div>
              <div className="name-job">
                <div className="profile_name">SEP</div>
                <div className="job">2024</div>
              </div>
              <i className="bx bx-log-out"></i>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
