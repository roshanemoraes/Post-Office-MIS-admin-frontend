import React from "react";
import NormalMailReceipt from "../../components/Receipts/NormalMailReceipt";
import BlurBackground from "../../components/Custom/Background/BlurBackground";

const Dashboard = () => {
  return (
    <div>
      <div>This is Receptionist's dashboard...</div>
      <NormalMailReceipt />
    </div>
  );
};
// const Dashboard = () => {
//   return (
//     <div>
//       <BlurBackground />
//       <div className="content">
//         <div>This is Receptionist's dashboard...</div>
//         <NormalMailReceipt />
//       </div>
//     </div>
//   );
// };

export default Dashboard;
