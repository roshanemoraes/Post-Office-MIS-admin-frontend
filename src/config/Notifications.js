import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [client, setClient] = useState(null);

  useEffect(() => {
    const stompClient = new Client({
      brokerURL:
        "wss://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/ws",
      connectHeaders: {},
      webSocketFactory: () =>
        new SockJS(
          "https://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/ws"
        ),
      onConnect: () => {
        console.log("Connected to WebSocket");
        stompClient.subscribe(`/topic/notifications`, (message) => {
          console.log("Received message:", message);
          const notification = JSON.parse(message.body);
          setNotifications((prev) => [notification, ...prev]);
        });
      },
    });
    stompClient.activate();
    setClient(stompClient);

    return () => stompClient.deactivate();
  }, []);

  const sendNotification = (message) => {
    if (client) {
      const notification = {
        customerId: 3,
        message: message,
      };
      client.publish({
        destination: "/app/notify",
        body: JSON.stringify(notification),
      });
    }
  };

  return (
    <>
      <button onClick={() => sendNotification("New broadcast notification")}>
        Send Notification
      </button>
      <div>Notification Window</div>
      {/* <div>
        {notifications.map((notification) => (
          <div key={notification.notificationId}>
            <p>{notification.message}</p>
          </div>
        ))}
      </div> */}
    </>
  );
};

export default Notifications;
