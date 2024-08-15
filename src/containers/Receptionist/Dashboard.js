import React from "react";
import DashboardCard from "../../components/Layout/DashboardCard";
import MailIcon from "../../assets/icons8-mail-50.png";
import DoughnutChart from "./Charts/DoughnutChart";

// const Dashboard = () => {
//   const customerInfo = {
//     name: "John Doe",
//     address: "123, Main Street, Colombo 05",
//     contact: "077-1234567",
//   };
//   const invoiceInfo = {
//     invoiceNumber: 1882,
//     date: "14/7/2024",
//     subtotal: 249.2,
//     discount: 24.92,
//     total: 224.28,
//   };

//   const componentRef = useRef();
//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//   });

//   return (
//     <div>
//       <div>This is Receptionist's dashboard...</div>
//       {/* <NormalMailReceipt /> */}
//       <button onClick={handlePrint}>Print this out!</button>
//       <div ref={componentRef}>
//         <Invoice
//           discount={10}
//           customerInfo={customerInfo}
//           invoiceInfo={invoiceInfo}
//         />
//       </div>
//     </div>
//   );
// };
const Dashboard = () => {
  return (
    <>
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
              title={"INDIVIDUAL MAILS"}
              value={"112"}
              iconSrc={MailIcon}
            />
          </div>
          <div className="sm:col-span-1">
            <DashboardCard
              backgroundColor={"#ffffff"}
              title={"BULK MAILS"}
              value={"3000"}
              iconSrc={MailIcon}
            />
          </div>
          <div className="sm:col-span-1">
            <DashboardCard
              backgroundColor={"#ffffff"}
              title={"CUSTOMER INQUIRIES"}
              value={"21"}
              iconSrc={MailIcon}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div
          className="col-span-1 mt-[10px]"
          style={{ width: "560px", height: "560px" }}
        >
          <DoughnutChart />
        </div>
        <div className="col-span-1"></div>
      </div>
    </>
  );
};

export default Dashboard;
