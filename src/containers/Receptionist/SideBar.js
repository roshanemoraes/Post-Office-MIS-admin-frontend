import React from "react";
import { useState } from "react";
import "./style.css";

const SideBar = () => {
  const [isSideBarOpen, setSideBarOpen] = useState(true);
  const [isSubMenuOpen, setSubMenuOpen] = useState(Array(2).fill(true));

  const handleSidebarToggle = () => {
    setSideBarOpen(!isSideBarOpen);
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
          <i className="bx bxl-c-plus-plus"></i>
          <span className="logo_name">Sri Lanka Post</span>
        </div>
        <ul className="nav-links">
          <li>
            <a href="/receptionist">
              <i className="bx bxs-dashboard"></i>
              <span className="link_name">Dashboard</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  Dashboard
                </a>
              </li>
            </ul>
          </li>
          <li className={isSubMenuOpen[0] ? "showMenu" : ""}>
            <div className="iocn-link">
              <a href="#">
                <i className="bx bx-envelope"></i>
                <span className="link_name">New Post</span>
              </a>
              <i
                className="bx bxs-chevron-down arrow"
                onClick={() => handleSubMenuToggle(0)}
              ></i>
            </div>
            <ul className="sub-menu">
              <li>
                <a className="link_name" href="#">
                  New Post
                </a>
              </li>
              <li>
                <a href="/receptionist/normal-post">Normal Post</a>
              </li>
              <li>
                <a href="/receptionist/registered-post">Registered Post</a>
              </li>
              <li>
                <a href="/receptionist/logi-post">Logi Post</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="/receptionist/fast-courier">
              <i className="bx bx-package"></i>
              <span className="link_name">Fast Courier</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  Fast Courier
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-credit-card"></i>
              <span className="link_name">Money Orders</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  Money Orders
                </a>
              </li>
            </ul>
          </li>
          <li className={isSubMenuOpen[1] ? "showMenu" : ""}>
            <div className="iocn-link">
              <a href="#">
                <i className="bx bx-note"></i>
                <span className="link_name">Utility Bills</span>
              </a>
              <i
                className="bx bxs-chevron-down arrow"
                onClick={() => handleSubMenuToggle(1)}
              ></i>
            </div>
            <ul className="sub-menu">
              <li>
                <a className="link_name" href="#">
                  Utility Bills
                </a>
              </li>
              <li>
                <a href="#">Water</a>
              </li>
              <li>
                <a href="#">Electricity</a>
              </li>
              <li>
                <a href="#">Mobile</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-cog"></i>
              <span className="link_name">Settings</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  Settings
                </a>
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
      <section className="home-section">
        <div className="home-content">
          <i className="bx bx-menu" onClick={handleSidebarToggle}></i>
          <span className="text"></span>
        </div>
      </section>
    </div>
  );
};

export default SideBar;
