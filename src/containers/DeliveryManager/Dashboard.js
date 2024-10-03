import React from "react";
import MailIcon from "../../assets/icons8-mail-50.png";
import DashboardCard from "../../components/Layout/DashboardCard";
import AssignRoute from "./AssignRoute";
import StackedBarChart from "../Postmaster/Charts/StackedBarChart";
import DashboardCard1 from "../../components/Layout/DashboardCard1";
import VerticalBarChart from "./Charts/VerticalBarChart";
import DeliveryManagerCustomCard1 from "../../components/Layout/DeliveryManagerCustomCard1";

const Dashboard = () => {
  return (
    <div className="mr-2">
      <div className="grid sm:grid-cols-4 xs:grid-cols-2 gap-2">
        <div className="sm:col-span-1">
          <DashboardCard1
            backgroundColor={"#ffffff"}
            title={"ALL MAILS TODAY"}
            value={"9756"}
            iconSrc={MailIcon}
          />
        </div>
        <div className="sm:col-span-1">
          <DashboardCard1
            backgroundColor={"#ffffff"}
            title={"UNDELIVERED MAILS"}
            value={"112"}
            iconSrc={MailIcon}
          />
        </div>
        <div className="sm:col-span-1">
          <DashboardCard1
            backgroundColor={"#ffffff"}
            title={"IN-AREA STATUS"}
            value={"2/6 Done"}
            iconSrc={MailIcon}
          />
        </div>
        <div className="sm:col-span-1">
          <DashboardCard1
            backgroundColor={"#ffffff"}
            title={"OUT-AREA STATUS"}
            value={"1/8 Done"}
            iconSrc={MailIcon}
          />
        </div>
      </div>

      <div className="mt-2"></div>

      <div className="grid sm:grid-cols-12 xs:grid-cols-1 gap-2 ">
        <div className="sm:col-span-6 bg-white rounded-lg">
          <div className="mb-2 pt-2 ml-5 text-sm text-center text-gray-500">
            DELIVERY SUMMARY
          </div>
          <AssignRoute />
        </div>
        <div
          className="sm:col-span-6"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <StackedBarChart />
          <div className="mt-2"></div>
          <DeliveryManagerCustomCard1
            backgroundColor={"#ffffff"}
            title={"UNDELIVERED MAIL STATISTICS"}
            value={"112"}
            iconSrc={MailIcon}
          />
        </div>
      </div>
      {/* <div style={{ width: "50%" }}>
        <VerticalBarChart />
      </div> */}
      <div className="mt-2 min-h-[100px]"></div>
    </div>
  );
};

export default Dashboard;
