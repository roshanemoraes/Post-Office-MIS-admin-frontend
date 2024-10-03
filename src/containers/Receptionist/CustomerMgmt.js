import React from "react";
import Notifications from "../../config/Notifications";
import Settings from "./Settings";
import axios from "axios";

const CustomerMgmt = () => {
  const handlePayment = () => {
    const orderDetails = {
      // Example order details
      totalAmount: 2000, // Amount in cents (e.g., $20.00)
      currency: "usd",
      productName: "zoshFood",
    };

    // fetch("/api/payment", {
    //   // Your backend endpoint
    //   method: "POST",
    //   body: JSON.stringify(orderDetails),
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.paymentUrl) {
    //       window.location.href = data.paymentUrl; // Redirect the user to the Stripe Checkout page
    //     }
    //   })
    //   .catch((error) => console.error("Payment creation failed", error));

    axios
      .post("http://localhost:8080/api/create")
      .then((response) => {
        const data = response.data;
        console.log(data);
        console.log("request came!");
        if (data.paymentUrl) {
          window.location.href = data.paymentUrl; // Redirect the user to the Stripe Checkout page
        }
      })
      .catch((error) => console.error("Payment creation failed", error));
  };

  return (
    <div>
      <h2>Customer Management</h2>
      {/* Other components or elements */}
      <button onClick={handlePayment}>Proceed to Payment</button>
    </div>
  );
};

export default CustomerMgmt;
