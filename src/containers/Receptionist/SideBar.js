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
          <span className="logo_name">SL POST</span>
        </div>
        <ul className="nav-links">
          <li>
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
          <li className={isSubMenuOpen[0] ? "showMenu" : ""}>
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
              <li>
                <Link className="link_name" to="#">
                  NEW MAIL
                </Link>
              </li>
              <li>
                <Link to="/admin/receptionist/normal-post">Normal Post</Link>
              </li>
              <li>
                <Link to="/admin/receptionist/normal-courier">
                  Normal Courier Post
                </Link>
              </li>
              <li>
                <Link to="/admin/receptionist/normal-parcel">
                  Normal Parcel Post
                </Link>
              </li>
              <li>
                <Link to="/admin/receptionist/gov-parcel">
                  Government Parcel Post
                </Link>
              </li>

              <li>
                <Link to="/admin/receptionist/money-orders">Money Orders</Link>
              </li>
            </ul>
          </li>
          <li>
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
          <li>
            <Link to="/admin/receptionist/customer-mgmt">
              <i className="bx bx-package"></i>
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
          {/* <li>
            <Link to="/admin/receptionist/return-mail">
              <i className="bx bx-credit-card"></i>
              <span className="link_name">Return Mail Management</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="/admin/receptionist/return-mail">
                  Return Mail Management
                </Link>
              </li>
            </ul>
          </li> */}
          {/* <li className={isSubMenuOpen[1] ? "showMenu" : ""}>
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
          </li> */}

          <li>
            <div className="profile-details">
              <div className="profile-content">
                {/* <img src="" alt="" /> */}
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
