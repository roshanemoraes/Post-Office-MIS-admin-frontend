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
          <li className={isActiveLink("/admin/receptionist")}>
            <Link to="/admin/receptionist">
              <i className="bx bxs-dashboard"></i>
              <span className="link_name">DASHBOARD</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="/admin/receptionist">
                  DASHBOARD
                </Link>
              </li>
            </ul>
          </li>
          <li className={`${isSubMenuOpen[0] ? "showMenu" : ""}`}>
            <div className="iocn-link">
              <Link to="#">
                <i className="bx bx-envelope"></i>
                <span className="link_name">NEW MAIL</span>
              </Link>
              <i
                className="bx bxs-chevron-down arrow"
                onClick={() => handleSubMenuToggle(0)}
              ></i>
            </div>
            <ul className="sub-menu">
              <li className={isActiveLink("/admin/receptionist/normal-post")}>
                <Link to="/admin/receptionist/normal-post">Normal Post</Link>
              </li>
              <li
                className={isActiveLink("/admin/receptionist/normal-courier")}
              >
                <Link to="/admin/receptionist/normal-courier">
                  Normal Courier Post
                </Link>
              </li>
              <li className={isActiveLink("/admin/receptionist/normal-parcel")}>
                <Link to="/admin/receptionist/normal-parcel">
                  Normal Parcel Post
                </Link>
              </li>
              <li className={isActiveLink("/admin/receptionist/gov-parcel")}>
                <Link to="/admin/receptionist/gov-parcel">
                  Government Parcel Post
                </Link>
              </li>
            </ul>
          </li>
          <li className={isActiveLink("/admin/receptionist/bulk-mail")}>
            <Link to="/admin/receptionist/bulk-mail">
              <i className="bx bx-package"></i>
              <span className="link_name">BULK MAILS</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="/admin/receptionist/bulk-mail">
                  BULK MAILS
                </Link>
              </li>
            </ul>
          </li>
          <li className={isActiveLink("/admin/receptionist/money-order")}>
            <Link to="/admin/receptionist/money-order">
              <i className="bx bx-dollar-circle"></i>
              <span className="link_name">MONEY ORDER</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link
                  className="link_name"
                  to="/admin/receptionist/money-order"
                >
                  MONEY ORDER
                </Link>
              </li>
            </ul>
          </li>
          <li className={isActiveLink("/admin/receptionist/customer-mgmt")}>
            <Link to="/admin/receptionist/customer-mgmt">
              <i className="bx bx-user"></i>
              <span className="link_name">CUSTOMER INFO</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link
                  className="link_name"
                  to="/admin/receptionist/customer-mgmt"
                >
                  CUSTOMER INFO
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <div className="profile-details">
              <div className="profile-content">
                {/* <img src="" alt="" /> */}
              </div>
              <div className="name-job ml-[40px]">
                <div className="profile_name">S E P</div>
                <div className="job ml-[5px]">2024</div>
              </div>

              <Link to="/admin/login">
                <i className="bx bx-log-out"></i>
                {/* <span className="logOut">CUSTOMER INFO</span> */}
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
