import { useContext } from "react";
import NotificationContext from "../NotificationContext";
import { Alert } from "react-bootstrap";

const Notification = () => {
  const [notification] = useContext(NotificationContext);

  if (!notification) return null;

  return (
    <div className="container">
      {notification.message && (
        <Alert variant={notification.type}>{notification.message}</Alert>
      )}
    </div>
  );
};

export default Notification;
