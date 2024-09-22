/*import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import personIcon from "./person-circle.svg";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  const navigateToUpdatePage = () => {
    navigate("/customer/profile/updateprofile"); // Replace '/update-profile' with the path to your desired page
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/customer/list/profile/2"
      );
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          marginTop: "25px",
          color: "gray",
          fontWeight: "bold",
          fontSize: "30px",
        }}
      >
        Hi, {rows.fullName}
      </h1>
      <div className="flex justify-center items-start pt-4">
        <img
          className="h-32 32 rounded-full"
          //src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          src={personIcon}
          alt="ProfilePicture"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          fontWeight: "bold",
        }}
      >
        <button
          className="bg-[#852318] text-white font-bold py-2 px-4 border border-[#852318] rounded mt-2"
          onClick={navigateToUpdatePage}
        >
          Update Profile
        </button>
      </div>
      <h4
        style={{
          textAlign: "center",
          marginTop: "30px",
          marginBottom: "15px",
          color: "black",
          marginLeft: "450px",
          marginRight: "450px",
          // fontWeight: "bold",
          fontSize: "22px",
          // backgroundColor: "grey",
        }}
      >
        Profile Details
      </h4>
      <div className="bg-[#9ca3af] h-[2px] mx-[500px] my-[50px]"></div>*/

/* <ProfileDataTable /> */

/*<div
        className="grid grid-cols-3 mx-[500px] flex "
        style={{ alignItems: "center" }}
      >
        <div className="col-span-1 text-[20px] md:font-bold">ID</div>
        <div className="col-span-2">
          <input
            readOnly
            value={rows.id}
            className="mt-2.5 px-4 py-3 border-2 rounded-md text-[22px] w-full"
          />
        </div>
      </div>
      <div
        className="grid grid-cols-3 mx-[500px] flex "
        style={{ alignItems: "center" }}
      >
        <div className="col-span-1 text-[20px] md:font-bold">FULL NAME</div>
        <div className="col-span-2">
          <input
            readOnly
            value={rows.fullName}
            className="mt-2.5 px-4 py-3 border-2 rounded-md text-[22px] w-full"
          />
        </div>
      </div>
      <div
        className="grid grid-cols-3 mx-[500px] flex "
        style={{ alignItems: "center" }}
      >
        <div className="col-span-1 text-[20px] md:font-bold">NIC</div>
        <div className="col-span-2">
          <input
            readOnly
            value={rows.nic}
            className="mt-2.5 px-4 py-3 border-2 rounded-md text-[22px] w-full"
          />
        </div>
      </div>
      <div
        className="grid grid-cols-3 mx-[500px] flex "
        style={{ alignItems: "center" }}
      >
        <div className="col-span-1 text-[20px] md:font-bold">EMAIL</div>
        <div className="col-span-2">
          <input
            readOnly
            value={rows.email}
            className="mt-2.5 px-4 py-3 border-2 rounded-md text-[22px] w-full"
          />
        </div>
      </div>
      <div
        className="grid grid-cols-3 mx-[500px] flex "
        style={{ alignItems: "center" }}
      >
        <div className="col-span-1 text-[20px] md:font-bold ">CONTACT</div>
        <div className="col-span-2">
          <input
            readOnly
            value={rows.contactNumber}
            className="mt-2.5 px-4 py-3 border-2 rounded-md text-[22px] w-full"
          />
        </div>
      </div>

      <div className="min-h-[200px]"></div>
    </div>
  );
};

export default Profile;*/

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const navigateToUpdatePage = () => {
    navigate("/customer/profile/updateprofile");
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/customer/list/profile/2"
      );
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching users ", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-6 mt-20">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-1/4 px-4 mb-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="account-settings text-center">
              <div className="user-avatar mb-4">
                <img
                  className="w-24 h-24 rounded-full mx-auto"
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  alt="Customer Profile"
                />
              </div>
              <h5 className="text-lg font-semibold">{rows.fullName}</h5>
              <h6 className="text-gray-500 text-sm">{rows.email}</h6>
              <h6 className="text-gray-500 text-sm">{rows.contactNumber}</h6>
            </div>
          </div>
        </div>
        {/* customer info table */}
        <div className="w-full lg:w-3/4 px-4">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-6">
              <h6 className="text-blue-500 mb-4">Personal Details</h6>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label
                    htmlFor="id"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ID
                  </label>
                  <input
                    readOnly
                    value={rows.id}
                    type="text"
                    id="id"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    placeholder="ID"
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="nic"
                    className="block text-sm font-medium text-gray-700"
                  >
                    NIC
                  </label>
                  <input
                    readOnly
                    value={rows.nic}
                    type="text"
                    id="nic"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    placeholder="NIC"
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    readOnly
                    value={rows.fullName}
                    type="text"
                    id="fullName"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    placeholder="Full Name"
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contact Number
                  </label>
                  <input
                    readOnly
                    value={rows.contactNumber}
                    type="text"
                    id="phone"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="eMail"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    readOnly
                    value={rows.email}
                    type="email"
                    id="eMail"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    placeholder="Enter email ID"
                  />
                </div>
              </div>
            </div>

            <div className="text-right">
              {/*<button className="bg-gray-500 text-white py-2 px-4 rounded mr-2">
                Cancel
              </button>*/}
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-900"
                onClick={navigateToUpdatePage}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
