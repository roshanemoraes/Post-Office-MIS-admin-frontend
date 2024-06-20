import React from "react";
import Test1 from "../Postmaster/Test";

const Dashboard = () => {
  return (
    <div>
      <div>This is Receptionist's dashboard...</div>
      <Test1
        destinations={[
          { lat: 7.210686, lng: 79.835901 }, //postofc
          { lat: 7.213954, lng: 79.847701 }, //msc main
          { lat: 7.213504, lng: 79.841589 }, //amc
        ]}
      />
    </div>
  );
};

export default Dashboard;
