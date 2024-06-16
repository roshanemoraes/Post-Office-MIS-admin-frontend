import React from "react";
import { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

const SideBar = ({ onSidebarToggle }) => {
  const [isSideBarOpen, setSideBarOpen] = useState(window.innerWidth >= 1150);
  const [isSubMenuOpen, setSubMenuOpen] = useState(Array(2).fill(true));

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
    console.log("handleSubMenuToggle called with index:", index);
    const newSubMenuOpen = [...isSubMenuOpen];
    newSubMenuOpen[index] = !newSubMenuOpen[index];
    console.log("newSubMenuOpen:", newSubMenuOpen);
    setSubMenuOpen(newSubMenuOpen);
  };

  return (
    <div>
      <div className={`sidebar ${isSideBarOpen ? "" : "close"}`}>
        <div className="logo-details">
          <i className="bx bx-menu" onClick={handleSidebarToggle}></i>
          <span className="logo_name">Sri Lanka Post</span>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/receptionist">
              <i className="bx bxs-dashboard"></i>
              <span className="link_name">Dashboard</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="#">
                  Dashboard
                </Link>
              </li>
            </ul>
          </li>
          <li className={isSubMenuOpen[0] ? "showMenu" : ""}>
            <div className="iocn-link">
              <Link to="#">
                <i className="bx bx-envelope"></i>
                <span className="link_name">New Post</span>
              </Link>
              <i
                className="bx bxs-chevron-down arrow"
                onClick={() => handleSubMenuToggle(0)}
              ></i>
            </div>
            <ul className="sub-menu">
              <li>
                <Link className="link_name" to="#">
                  New Post
                </Link>
              </li>
              <li>
                <Link to="/receptionist/normal-post">Normal Post</Link>
              </li>
              <li>
                <Link to="/receptionist/registered-post">Registered Post</Link>
              </li>
              <li>
                <Link to="/receptionist/logi-post">Logi Post</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/receptionist/fast-courier">
              <i className="bx bx-package"></i>
              <span className="link_name">Fast Courier</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="#">
                  Fast Courier
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="#">
              <i className="bx bx-credit-card"></i>
              <span className="link_name">Money Orders</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="#">
                  Money Orders
                </Link>
              </li>
            </ul>
          </li>
          <li className={isSubMenuOpen[1] ? "showMenu" : ""}>
            <div className="iocn-link">
              <Link to="#">
                <i className="bx bx-note"></i>
                <span className="link_name">Utility Bills</span>
              </Link>
              <i
                className="bx bxs-chevron-down arrow"
                onClick={() => handleSubMenuToggle(1)}
              ></i>
            </div>
            <ul className="sub-menu">
              <li>
                <Link className="link_name" to="#">
                  Utility Bills
                </Link>
              </li>
              <li>
                <Link to="#">Water</Link>
              </li>
              <li>
                <Link to="#">Electricity</Link>
              </li>
              <li>
                <Link to="#">Mobile</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="#">
              <i className="bx bx-cog"></i>
              <span className="link_name">Settings</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="#">
                  Settings
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <div className="profile-details">
              <div className="profile-content">
                <img src="" alt="" />
              </div>
              <div className="name-job">
                <div className="profile_name">S E P</div>
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
