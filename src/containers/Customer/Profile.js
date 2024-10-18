import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const customerId = "2";
  const navigateToUpdatePage = () => {
    navigate("/customer/profile/updateprofile");
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/api/customer/list/profile/${customerId}`
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
