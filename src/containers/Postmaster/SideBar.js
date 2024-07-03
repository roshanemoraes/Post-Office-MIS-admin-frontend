import React from "react";
import { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

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
            <Link to="/postmaster/">
              <i className="bx bx-grid-alt"></i>
              <span className="link_name">Dashboard</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="#">
                  Category
                </Link>
              </li>
            </ul>
          </li>
          <li className={isSubMenuOpen[0] ? "showMenu" : ""}>
            <div className="iocn-link">
              <Link to="#">
                <i className="bx bx-collection"></i>
                <span className="link_name">Statistics</span>
              </Link>
              <i
                className="bx bxs-chevron-down arrow"
                onClick={() => handleSubMenuToggle(0)}
              ></i>
            </div>
            <ul className="sub-menu">
              <li>
                <Link className="link_name" to="#">
                  Statistics
                </Link>
              </li>
              <li>
                <Link to="#">Chart 1</Link>
              </li>
              <li>
                <Link to="#">Chart 2</Link>
              </li>
              <li>
                <Link to="#">Chart 3</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/postmaster/live-map">
              <i className="bx bx-pie-chart-alt-2"></i>
              <span className="link_name">Live Map</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="#">
                  Live Map
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/postmaster/list-employee">
              <i className="bx bx-line-chart"></i>
              <span className="link_name">List Employees</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="#">
                  List Employees
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/postmaster/add-employee">
              <i className="bx bx-compass"></i>
              <span className="link_name">Add Employee</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="#">
                  Add Employee
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/receptionist">
              <i className="bx bx-cog"></i>
              <span className="link_name">Receptionist</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="#">
                  Receptionist
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/delivery-manager">
              <i className="bx bx-cog"></i>
              <span className="link_name">Delivery Manager</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="#">
                  Delivery Manager
                </Link>
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
