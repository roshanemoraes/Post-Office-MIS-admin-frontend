import React, { useEffect } from "react";
import MailIcon from "../../assets/icons8-mail-50.png";
import DashboardCard1 from "../../components/Layout/DashboardCard1";
import StackedBarChart from "./Charts/StackedBarChart";
import AssignRoute from "../DeliveryManager/AssignRoute";
import RegistrationSummary from "../../components/Layout/RegistrationSummary";
import PostageTable from "../../components/Layout/PostageTable";
import PostageYearlyChart from "./Charts/PostageYearlyChart";
import PostageDailyChart from "./Charts/PostageDailyChart";
import UndeliveredTypesTodayChart from "./Charts/UndeliveredTypesTodayChart";

const Dashboard = () => {
  const [isLoading, setLoading] = React.useState(true); // Set initial loading to true

  const minimumLoadingDuration = (promise, duration) => {
    return Promise.all([
      promise,
      new Promise((resolve) => setTimeout(resolve, duration)),
    ]);
  };

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      await minimumLoadingDuration(
        Promise.resolve(),
        process.env.REACT_APP_LOADING_DELAY
      ); // Simulate loading with a minimum of 1.2 seconds
      setLoading(false); // Set loading to false after the delay
    };
    loadDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="fixed top-0 left-[100px] w-full h-full bg-[#737373] bg-opacity-70 flex items-center justify-center ">
        <div className="flex flex-col items-center">
          <div className="w-[100px] h-[100px] border-8 border-gray-300 border-t-[#000] rounded-full animate-spin"></div>
          <span className="mt-4 text-[25px] text-black font-sans tracking-wide">
            Loading...
          </span>
        </div>
      </div>
    );
  }
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
            <PostageDailyChart />
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
          <div className="sm:col-span-6 bg-white rounded-lg">
            <div className="mb-2 pt-2 ml-5 text-sm text-center text-gray-500">
              TODAY UNDELIVERED STATUS
            </div>
            <UndeliveredTypesTodayChart />
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
