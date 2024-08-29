import React from "react";
import MailIcon from "../../assets/icons8-mail-50.png";
import DashboardCard from "../../components/Layout/DashboardCard";
import DashboardCard1 from "../../components/Layout/DashboardCard1";
import LineChart from "./Charts/LineChart";
import StackedBarChart from "./Charts/StackedBarChart";
import AssignRoute from "../DeliveryManager/AssignRoute";
import RegistrationSummary from "../../components/Layout/RegistrationSummary";
import PostageTable from "../../components/Layout/PostageTable";

const Dashboard = () => {
  return (
    <>
      <div style={{ marginRight: "8px" }}>
        <div className="grid sm:grid-cols-4 xs:grid-cols-2 gap-2 xs:gap-2">
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
              title={"TOTAL REVENUE"}
              value={"Rs. 21,760"}
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
        <div className="grid lg:grid-cols-2 mr-2">
          <div className="col-span-1 bg-white rounded-lg">
            <div className="mb-2 pt-2 ml-5 text-sm text-center text-gray-500">
              TODAY POSTAGE INCOME
            </div>
            <LineChart />
          </div>
          <div className="col-span-1 bg-white rounded-lg ml-2">
            <div className="mb-2 pt-2 ml-5 text-sm text-center text-gray-500">
              TODAY DELIVERY STATUS
            </div>
            <StackedBarChart />
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
        </div>
        <div className="mt-2"></div>
        <div className="grid grid-cols-12 mr-2">
          <div className="col-span-8 bg-white rounded-lg mr-2">
            <div className="mb-2 pt-2 text-sm text-center text-gray-500">
              TODAY REGISTRATION SUMMARY
            </div>
            <RegistrationSummary />
          </div>

          <div className="col-span-4 bg-white rounded-lg">
            <div className="mb-2 pt-2 ml-5 text-sm text-center text-gray-500">
              UPDATED POSTAGE RATES
            </div>
            <PostageTable />
          </div>
        </div>
        <div className="mt-5"></div>
      </div>
    </>
  );
};

export default Dashboard;
