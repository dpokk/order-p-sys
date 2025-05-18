// src/hooks/useNotification.js

import { useState } from "react";

const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = "info") => {
    setNotifications([...notifications, { message, type }]);
  };

  const removeNotification = (index) => {
    setNotifications(notifications.filter((_, i) => i !== index));
  };

  return { notifications, addNotification, removeNotification };
};

export default useNotification;
