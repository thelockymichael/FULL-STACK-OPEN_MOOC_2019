import React from "react";
import "./notification.css";

const Notification = props => {
  const { message } = props;

  if (message === null) {
    return null;
  }

  return message !== null ? <div className="message">{message}</div> : message;
};

export default Notification;
