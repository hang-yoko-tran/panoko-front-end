import React from "react";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import ReactNotifications from "react-notifications-component";

export default function Notification() {
  const notify = (title = "Info", message = "", type = "default") => {
    store.addNotification({
      title: title,
      message: message,
      type: type, // 'default', 'success', 'info', 'warning'
      container: "bottom-left", // where to position the notifications
      animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
      animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
      dismiss: {
        duration: 3000
      }
    });
  };
  return (
    <div>
      <ReactNotifications />
    </div>
  );
}
