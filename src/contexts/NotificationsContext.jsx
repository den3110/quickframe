import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
// import decodeJWT from 'util/jwtDecode'
import notificationApi from "api/notification/notificationApi";
import { showToast } from "components/toast/toast";
import { useTranslation } from "react-i18next";
import { SocketContext } from "./SocketContext";

export const NotificationContext = createContext();

const NotificationsProvider = ({ children }) => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [unReadNotification, setUnReadNotification] = useState(0);
  const {isConnected, socket }= useContext(SocketContext)

  useEffect(() => {
    (async () => {
      try {
        const response = await notificationApi.getUserNotification();
        if (response?.data?.ok === true) {
          setData(response?.data?.d);
          setUnReadNotification(response?.data?.no_read_count);
        } else if (response?.data?.ok === false) {
        }
      } catch (error) {
        // showToast(error?.response?.data?.m || t("unknown_error"), "error");
      }
    })();
  }, [t]);
  
  useEffect(()=> {
    if(isConnected && socket) {
        socket.on("PUSH_NOTIFICATION", dataSocket=> {
            setData(prev=> ([dataSocket, ...prev]))
            setUnReadNotification(prev=> (parseInt(prev) + parseInt(1)))
        })
    }
  }, [isConnected, socket])

  return (
    <NotificationContext.Provider value={{ data, setData, unReadNotification, setUnReadNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationsProvider;
