import React from "react";
import { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Postmaster from "./../../Navigation/Postmaster";

const SideBar = ({ onSidebarToggle }) => {
  const [isSideBarOpen, setSideBarOpen] = useState(window.innerWidth >= 1024);
  const [isSubMenuOpen, setSubMenuOpen] = useState(Array(2).fill(true));

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
          <span className="logo_name">SL POST</span>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/admin/delivery-manager">
              <i className="bx bx-grid-alt"></i>
              <span className="link_name">DASHBOARD</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="#">
                  DASHBOARD
                </Link>
              </li>
            </ul>
          </li>
          <li className={isSubMenuOpen[1] ? "showMenu" : ""}>
            <div className="iocn-link">
              <Link to="#">
                <i className="bx bx-sort"></i>
                <span className="link_name">SORT MAILS</span>
              </Link>
              <i
                className="bx bxs-chevron-down arrow"
                onClick={() => handleSubMenuToggle(1)}
              ></i>
            </div>
            <ul className="sub-menu">
              <li>
                <Link className="link_name" to="#">
                  SORT MAILS
                </Link>
              </li>
              <li>
                <Link to="/admin/delivery-manager/mail-sort">
                  All Mails To Deliver
                </Link>
              </li>
              <li>
                <Link to="/admin/delivery-manager/mail-sort/in-area">
                  In-Area Mail Mgmt
                </Link>
              </li>
              <li>
                <Link to="/admin/delivery-manager/mail-sort/out-area">
                  Out-Area Mail Mgmt
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/admin/delivery-manager/route-allocation">
              <i className="bx bxs-map"></i>
              <span className="link_name">ASSIGN ROUTE</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="#">
                  ASSIGN ROUTE
                </Link>
              </li>
            </ul>
          </li>

          <li className={isSubMenuOpen[0] ? "showMenu" : ""}>
            <div className="iocn-link">
              <Link to="#">
                <i className="bx bx-envelope"></i>
                <span className="link_name">RETURN MAILS</span>
              </Link>
              <i
                className="bx bxs-chevron-down arrow"
                onClick={() => handleSubMenuToggle(0)}
              ></i>
            </div>
            <ul className="sub-menu">
              <li>
                <Link className="link_name" to="#">
                  RETURN MAILS
                </Link>
              </li>
              <li>
                <Link to="/admin/delivery-manager/return-mail">
                  All Undeliverable Mails
                </Link>
              </li>
              <li>
                <Link to="/admin/delivery-manager/return-mail/return-to-sender">
                  Return-to-Sender List
                </Link>
              </li>
              <li>
                <Link to="/admin/delivery-manager/return-mail/address-update">
                  Address Update List
                </Link>
              </li>
              <li>
                <Link to="/admin/delivery-manager/return-mail/discarded-mail">
                  Discarded Mail List
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/admin/delivery-manager/notifications">
              <i className="bx bx-credit-card"></i>
              <span className="link_name">Nofitications</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link
                  className="link_name"
                  to="/admin/delivery-manager/notifications"
                >
                  Notifications
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <div className="profile-details">
              <div className="profile-content">
                {/* <img src="image/profile.jpg" alt="profileImg" /> */}
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
