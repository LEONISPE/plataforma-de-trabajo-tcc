import { io } from "socket.io-client";

export const socket = io(
   "https://plataforma-de-trabajo-tcc-f67w.onrender.com",
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