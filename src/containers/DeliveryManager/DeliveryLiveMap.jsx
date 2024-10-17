import React from "react";
import Map from "../../components/Maps/Map";
import InfoIconCardSmall from "../../components/Layout/InfoIconCardSmall";
import WalkIcon from "../../assets/bx-walk.svg";
import NotStartedIcon from "../../assets/bx-body.svg";
import CompletedDeliveryIcon from "../../assets/bx-check.svg";
import StartedDistributionIcon from "../../assets/bxs-truck.svg";

const DeliveryLiveMap = () => {
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

export default DeliveryLiveMap;
