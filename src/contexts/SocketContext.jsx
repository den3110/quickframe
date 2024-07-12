// src/context/SocketContext.js

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef();

  useEffect(() => {
    try {
      socketRef.current = io(process.env.REACT_APP_BASE_SOCKET_URL, {transports: ["websocket"],auth: {
          token: localStorage.getItem('accessToken'),
        }, query: {token: localStorage.getItem('accessToken'),}});

      socketRef.current.on("connect", () => {
        setIsConnected(true);
        console.log("Socket connected");
        // socketRef.current.emit("CURRENT_SESSION_SUBCRIBE", {});
      });

      socketRef.current.on("disconnect", () => {
        setIsConnected(false);
        console.log("Socket disconnected");
      });
    } catch (error) {
      console.log(error);
    }

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

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
