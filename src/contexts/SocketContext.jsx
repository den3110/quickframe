// src/context/SocketContext.js

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { io } from "socket.io-client";
import AuthContext from "./AuthContext";
import SpotBalanceContext from "./SpotBalanceContext";

export const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef();
  const {selectedLinkAccount }= useContext(AuthContext)
  const { setChange } = useContext(SpotBalanceContext);
      

  const getWebSocketUrl = () =>{
    return window.location.hostname.indexOf("localhost") > -1
      ? process.env.REACT_APP_BASE_SOCKET_URL
      : `${window.location.protocol}//ws.${window.location.hostname}`
  }

  useEffect(() => {
    try {
      socketRef.current = io( getWebSocketUrl(), {transports: ["websocket"],auth: {
          token: localStorage.getItem('accessToken'),
        }, query: {token: localStorage.getItem('accessToken'),}});

      socketRef.current.on("connect", () => {
        setIsConnected(true);
        // socketRef.current.emit("CURRENT_SESSION_SUBCRIBE", {});
        socketRef.current.emit("LINK_ACCOUNT_SUBCRIBE", selectedLinkAccount);
        socketRef.current.on("RELOAD_SPOT_BALANCE", (data) => {
          setChange(prev=> !prev)
        });
      });

      socketRef.current.on("disconnect", () => {
        setIsConnected(false);
      });
    } catch (error) {
      console.log(error);
    }

    return () => {
      socketRef.current.emit("LINK_ACCOUNT_UNSUBCRIBE", selectedLinkAccount);
      socketRef.current.disconnect();
    };
  }, [selectedLinkAccount, setChange]);

  const sendMessage = (eventName, data) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit(eventName, data);
    }
  };

  const value = {
    socket: socketRef.current,
    isConnected,
    sendMessage,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
