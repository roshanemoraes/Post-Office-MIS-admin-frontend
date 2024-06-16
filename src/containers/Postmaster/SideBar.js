import React from "react";
import { useState } from "react";
import "./style.css";

const SideBar = ({ onSidebarToggle }) => {
  const [isSideBarOpen, setSideBarOpen] = useState(window.innerWidth >= 1024);
  const [isSubMenuOpen, setSubMenuOpen] = useState(Array(1).fill(true));

  const handleSidebarToggle = () => {
    if (window.innerWidth < 1024) {
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
            <a href="/postmaster/">
              <i className="bx bx-grid-alt"></i>
              <span className="link_name">Dashboard</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  Category
                </a>
              </li>
            </ul>
          </li>
          <li className={isSubMenuOpen[0] ? "showMenu" : ""}>
            <div className="iocn-link">
              <a href="#">
                <i className="bx bx-collection"></i>
                <span className="link_name">Statistics</span>
              </a>
              <i
                className="bx bxs-chevron-down arrow"
                onClick={() => handleSubMenuToggle(0)}
              ></i>
            </div>
            <ul className="sub-menu">
              <li>
                <a className="link_name" href="#">
                  Statistics
                </a>
              </li>
              <li>
                <a href="#">Chart 1</a>
              </li>
              <li>
                <a href="#">Chart 2</a>
              </li>
              <li>
                <a href="#">Chart 3</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-pie-chart-alt-2"></i>
              <span className="link_name">Live Map</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  Live Map
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="/postmaster/list-employee">
              <i className="bx bx-line-chart"></i>
              <span className="link_name">List Employees</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  List Employees
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="/postmaster/add-employee">
              <i className="bx bx-compass"></i>
              <span className="link_name">Add Employee</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  Add Employee
                </a>
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
                <img src="image/profile.jpg" alt="profileImg" />
              </div>
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
