import React from "react";
import MailIcon from "../../assets/icons8-mail-50.png";
import DashboardCard from "../../components/Layout/DashboardCard";

const Dashboard = () => {
  return (
    <>
      <div style={{ marginRight: "8px" }}>
        <div className="grid sm:grid-cols-5 xs:grid-cols-2 gap-2 xs:gap-2">
          <div className="sm:col-span-1">
            <DashboardCard
              backgroundColor={"#ffedd5"}
              title={"ALL MAILS TODAY"}
              value={"9756"}
              iconSrc={MailIcon}
            />
          </div>
          <div className="sm:col-span-1">
            <DashboardCard
              backgroundColor={"#ecfccb"}
              title={"UNDELIVERED MAILS"}
              value={"112"}
              iconSrc={MailIcon}
            />
          </div>
          <div className="sm:col-span-1">
            <DashboardCard
              backgroundColor={"#cffafe"}
              title={"TOTAL REVENUE"}
              value={"Rs. 21,760"}
              iconSrc={MailIcon}
            />
          </div>
          <div className="sm:col-span-1">
            <DashboardCard
              backgroundColor={"#fae8ff"}
              title={"IN-AREA STATUS"}
              value={"2/6 Done"}
              iconSrc={MailIcon}
            />
          </div>
          <div className="sm:col-span-1">
            <DashboardCard
              backgroundColor={"#ffe4e6"}
              title={"OUT-AREA STATUS"}
              value={"1/8 Done"}
              iconSrc={MailIcon}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
