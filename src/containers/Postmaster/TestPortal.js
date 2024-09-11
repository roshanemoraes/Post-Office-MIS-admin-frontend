import React, { useEffect, useState } from "react";
import axios from "axios";

const TestPortal = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const customerId = "2";
        const response = await axios.get(
          `http://localhost:8081/api/notifications/${customerId}`,
          { withCredentials: true }
        );
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <div>
        {notifications.map((notification) => (
          <div key={notification.id}>
            <p>{notification.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestPortal;
