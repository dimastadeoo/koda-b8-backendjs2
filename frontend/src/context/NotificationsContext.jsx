// src/context/NotificationContext.jsx
import { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
  });

  const showNotification = ({ title, message, type = 'info' }) => {
    setNotification({
      isOpen: true,
      title,
      message,
      type,
    });
  };

  const hideNotification = () => {
    setNotification((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification, hideNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);