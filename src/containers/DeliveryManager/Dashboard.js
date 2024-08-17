import React from "react";
import MailIcon from "../../assets/icons8-mail-50.png";
import DashboardCard from "../../components/Layout/DashboardCard";
import AssignRoute from "./AssignRoute";
import StackedBarChart from "../Postmaster/Charts/StackedBarChart";

const Dashboard = () => {
  return (
    <div className="mr-2">
      <div className="grid sm:grid-cols-4 xs:grid-cols-2 gap-2">
        <div className="sm:col-span-1">
          <DashboardCard
            backgroundColor={"#ffffff"}
            title={"ALL MAILS TODAY"}
            value={"9756"}
            iconSrc={MailIcon}
          />
        </div>
        <div className="sm:col-span-1">
          <DashboardCard
            backgroundColor={"#ffffff"}
            title={"UNDELIVERED MAILS"}
            value={"112"}
            iconSrc={MailIcon}
          />
        </div>
        <div className="sm:col-span-1">
          <DashboardCard
            backgroundColor={"#ffffff"}
            title={"IN-AREA STATUS"}
            value={"2/6 Done"}
            iconSrc={MailIcon}
          />
        </div>
        <div className="sm:col-span-1">
          <DashboardCard
            backgroundColor={"#ffffff"}
            title={"OUT-AREA STATUS"}
            value={"1/8 Done"}
            iconSrc={MailIcon}
          />
        </div>
      </div>

      <div className="mt-2"></div>

      <div className="grid sm:grid-cols-12 xs:grid-cols-1 gap-2 items-center justify-center">
        <div className="sm:col-span-6 bg-white rounded-lg">
          <div className="mb-2 pt-2 ml-5 text-sm font-bold text-gray-500">
            DELIVERY SUMMARY
          </div>
          <AssignRoute />
        </div>
        <div className="sm:col-span-6 p-0 w-full flex justify-center items-center">
          <StackedBarChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
