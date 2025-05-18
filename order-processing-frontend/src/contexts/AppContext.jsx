// src/contexts/AppContext.jsx

import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = "info") => {
    setNotifications([...notifications, { message, type }]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <AppContext.Provider
      value={{ loading, setLoading, notifications, addNotification, clearNotifications }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
