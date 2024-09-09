import React from "react";
import DashboardCard from "../../components/Layout/DashboardCard";
import MailIcon from "../../assets/icons8-mail-50.png";
import DoughnutChart from "./Charts/DoughnutChart";
import DashboardCard1 from "./../../components/Layout/DashboardCard1";
import PostageTable from "../../components/Layout/PostageTable";
import RegistrationSummary from "../../components/Layout/RegistrationSummary";

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
              title={"INDIVIDUAL MAILS"}
              value={"112"}
              iconSrc={MailIcon}
            />
          </div>
          <div className="sm:col-span-1">
            <DashboardCard1
              backgroundColor={"#ffffff"}
              title={"BULK MAILS"}
              value={"3000"}
              iconSrc={MailIcon}
            />
          </div>
          <div className="sm:col-span-1">
            <DashboardCard1
              backgroundColor={"#ffffff"}
              title={"CUSTOMER INQUIRIES"}
              value={"21"}
              iconSrc={MailIcon}
            />
          </div>
        </div>
      </div>
      <div className="mt-2"></div>
      <div className="grid grid-cols-12 mr-2">
        {/* <div
          className="col-span-4 mt-[10px]"
          style={{ width: "560px", height: "560px" }}
        >
          <DoughnutChart />
        </div> */}
        <div className="col-span-8 bg-white rounded-lg mr-2">
          <div className="mb-2 pt-2 text-sm text-center text-gray-500">
            TODAY REGISTRATION SUMMARY
          </div>
          <RegistrationSummary />
          {/* <PostageTable /> */}
        </div>
        {/* <div className="col-span-6 bg-black rounded-lg">
          <div className="mb-2 pt-2 mx-2 text-sm text-center text-gray-500">
            UPDATED POSTAGE RATES
          </div>
          <PostageTable />
        </div> */}

        <div className="col-span-4 bg-white rounded-lg">
          <div className="mb-2 pt-2 ml-5 text-sm text-center text-gray-500">
            UPDATED POSTAGE RATES
          </div>
          <PostageTable />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
