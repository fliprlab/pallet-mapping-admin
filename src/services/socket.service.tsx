import { useEffect, useState } from "react";

import { Socket, io } from "socket.io-client";

export const newSocket = io(`${process.env.REACT_APP_BASE_URL}`);

export const useWebsocket = () => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    setSocket(newSocket);
  }, []);
  return {
    socket,
  };
};
