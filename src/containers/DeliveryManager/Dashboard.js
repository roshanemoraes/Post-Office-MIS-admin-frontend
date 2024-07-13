import React from "react";
import MailIcon from "../../assets/icons8-mail-50.png";
import DashboardCard from "../../components/Layout/DashboardCard";
import AssignRoute from "./AssignRoute";

const Dashboard = () => {
  return (
    <>
      <div style={{ backgroundColor: "white", marginRight: "8px" }}>
        <div className="grid sm:grid-cols-4 xs:grid-cols-2 gap-2 xs:gap-2">
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
              title={"IN-AREA STATUS"}
              value={"2/6 Done"}
              iconSrc={MailIcon}
            />
          </div>
          <div className="sm:col-span-1">
            <DashboardCard
              backgroundColor={"#fae8ff"}
              title={"OUT-AREA STATUS"}
              value={"1/8 Done"}
              iconSrc={MailIcon}
            />
          </div>
        </div>
        <div style={{ marginTop: "10px" }}></div>
        <div className="grid sm:grid-cols-12 xs:grid-cols-1 gap-2 xs:gap-2">
          <div className="sm:col-span-7" style={{ backgroundColor: "#e5e7eb" }}>
            <div
              style={{
                marginBottom: "10px",
                paddingTop: "10px",
                marginLeft: "20px",
                fontSize: "13px",
                fontWeight: "bold",
                color: "#6b7280",
              }}
            >
              DELIVERY SUMMARY
            </div>
            <AssignRoute />
          </div>
          <div className="sm:col-span-5">Chart....</div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
