import React, { useEffect } from "react";
import Map from "../../components/Maps/Map";
import InfoIconCardSmall from "../../components/Layout/InfoIconCardSmall";
import WalkIcon from "../../assets/bx-walk.svg";
import NotStartedIcon from "../../assets/bx-body.svg";
import CompletedDeliveryIcon from "../../assets/bx-check.svg";
import StartedDistributionIcon from "../../assets/bxs-truck.svg";

const LiveMap = () => {
  const [isLoading, setLoading] = React.useState(true); // Set initial loading to true

  const minimumLoadingDuration = (promise, duration) => {
    return Promise.all([
      promise,
      new Promise((resolve) => setTimeout(resolve, duration)),
    ]);
  };

  useEffect(() => {
    const loadLiveMap = async () => {
      setLoading(true);
      await minimumLoadingDuration(
        Promise.resolve(),
        process.env.REACT_APP_LOADING_DELAY
      ); // Simulate loading with a minimum of 1.2 seconds
      setLoading(false); // Set loading to false after the delay
    };
    loadLiveMap();
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
    <div className="grid grid-cols-12">
      <div className="col-span-2">
        <div className="bg-black text-center text-white mb-[10px] mx-[40px] border-r-2 p-[3px]">
          In-Area
        </div>
        <div>
          <InfoIconCardSmall
            backgroundColor={"#ffffff"}
            title={"PENDING DELIVERIES"}
            value={"4"}
            iconSrc={NotStartedIcon}
          />
        </div>
        <div className="my-[10px]">
          <InfoIconCardSmall
            backgroundColor={"#ffffff"}
            title={"STARTED DELIVERIES"}
            value={"4"}
            iconSrc={WalkIcon}
          />
        </div>
        <div>
          <InfoIconCardSmall
            backgroundColor={"#ffffff"}
            title={"COMPLETED DELIVERIES"}
            value={"4"}
            iconSrc={CompletedDeliveryIcon}
          />
        </div>
        <div className="bg-black text-center text-white my-[10px] mx-[40px] border-r-2 p-[3px]">
          Out-Area
        </div>
        <div>
          <InfoIconCardSmall
            backgroundColor={"#ffffff"}
            title={"STARTED DISTRIBUTIONS"}
            value={"4"}
            iconSrc={StartedDistributionIcon}
          />
        </div>
        <div className="my-[10px]">
          <InfoIconCardSmall
            backgroundColor={"#ffffff"}
            title={"COMPLETED DISTRIBUTIONS"}
            value={"4"}
            iconSrc={CompletedDeliveryIcon}
          />
        </div>
      </div>
      <div className="col-span-10">
        <Map />
      </div>
    </div>
  );
};

export default LiveMap;
