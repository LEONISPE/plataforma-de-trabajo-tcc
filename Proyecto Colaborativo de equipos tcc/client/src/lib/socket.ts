import { io } from "socket.io-client";

export const socket = io(
  "http://localhost:8000",
  {
    autoConnect: true,
  }
);

socket.on("connect", () => {
  console.log(
    "SOCKET CONECTADO:",
    socket.id
  );
});

socket.on("disconnect", () => {
  console.log(
    "SOCKET DESCONECTADO"
  );
});