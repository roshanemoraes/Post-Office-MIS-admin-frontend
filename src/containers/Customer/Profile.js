import React, { useEffect, useState } from "react";
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
      <div className="bg-[#9ca3af] h-[2px] mx-[500px] my-[50px]"></div>
      {/* <ProfileDataTable /> */}

      {/* <div className="flex justify-center w-full max-w-[700px] border border-black mx-auto">
        <div
          className="grid grid-cols-6  flex "
          style={{ alignItems: "center" }}
        >
          <div className="col-span-2 text-[20px] md:font-bold">ID</div>
          <div className="col-span-4">
            <input
              readOnly
              value={rows.id}
              className="mt-2.5 px-4 py-3 border-2 rounded-md text-[22px] w-full"
            />
          </div>
        </div>
      </div> */}

      <div
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

export default Profile;
