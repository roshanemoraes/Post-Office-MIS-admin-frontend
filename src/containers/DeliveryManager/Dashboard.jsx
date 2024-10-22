import React, { useEffect } from "react";
import MailIcon from "../../assets/icons8-mail-50.png";
import DashboardCard1 from "../../components/Layout/DashboardCard1";
import AssignRoute from "./AssignRoute";
import StackedBarChart from "../Postmaster/Charts/StackedBarChart";
import DeliveryManagerCustomCard1 from "../../components/Layout/DeliveryManagerCustomCard1";

const Dashboard = () => {
  const [isLoading, setLoading] = React.useState(true); // Set initial loading to true
  // Function to ensure a minimum loading duration by combining a promise and
  const minimumLoadingDuration = (promise, duration) => {
    return Promise.all([
      promise,
      new Promise((resolve) => setTimeout(resolve, duration)),
    ]);
  };
  // useEffect hook to simulate loading when the component is mounted
  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true); // Start by setting loading to true
      // Simulate loading delay using environment variable
      //REACT_APP_LOADING_D
      await minimumLoadingDuration(
        Promise.resolve(),
        process.env.REACT_APP_LOADING_DELAY
      ); // Simulate loading with a minimum of 1.2 seconds
      setLoading(false); // Set loading to false after the delay
    };
    loadDashboard(); // Invoke the loading function
  }, []);
  // Display a loading spinner while the dashboard is still loading
  if (isLoading) {
    return (
      <div className="fixed top-0 left-[100px] w-full h-full bg-[#737373] bg-opacity-70 flex items-center justify-center ">
        <div className="flex flex-col items-center">
          {/* Loading spinner animation */}
          <div className="w-[100px] h-[100px] border-8 border-gray-300 border-t-[#000] rounded-full animate-spin"></div>
          <span className="mt-4 text-[25px] text-black font-sans tracking-wide">
            Loading...
          </span>
        </div>
      </div>
    );
  }
  // Render the dashboard content after loading is complete
  return (
    <div className="mr-2">
      {/* First row of cards displaying general mail statistics */}
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
      <div className="mt-2"></div> {/* Spacing between sections */}
      {/* Second row displaying delivery route assignment and statistics */}
      <div className="grid sm:grid-cols-12 xs:grid-cols-1 gap-2 ">
        <div className="sm:col-span-6 bg-white rounded-lg">
          {/* Section for assigning routes */}
          <div className="mb-2 pt-2 ml-5 text-sm text-center text-gray-500">
            DELIVERY SUMMARY
          </div>
          <AssignRoute /> {/* Component to handle assigning routes */}
        </div>
        <div
          className="sm:col-span-6"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {/* Stacked bar chart displaying mail statistics */}
          <StackedBarChart />
          <div className="mt-2"></div>
          {/* Custom card displaying undelivered mail statistics */}
          <DeliveryManagerCustomCard1
            backgroundColor={"#ffffff"}
            title={"UNDELIVERED MAIL STATISTICS"}
            value={"112"}
            iconSrc={MailIcon}
          />
        </div>
      </div>
      <div className="mt-2 min-h-[100px]"></div>
    </div>
  );
};

export default Dashboard;
