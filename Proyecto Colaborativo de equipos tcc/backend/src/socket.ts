import { Server } from "socket.io";

let io: Server;

const userSocketMap: Record<string, string> = {};

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Usuario conectado:", socket.id);

    socket.on("join", (userId: string) => {

  console.log(
    "JOIN RECIBIDO:",
    userId
  );

  socket.join(userId);

  userSocketMap[userId] = socket.id;

  console.log(
    "Usuarios online:",
    Object.keys(userSocketMap)
  );

  io.emit(
    "online-users",
    Object.keys(userSocketMap)
  );
});

    socket.on("disconnect", () => {
      for (const userId in userSocketMap) {
        if (userSocketMap[userId] === socket.id) {
          delete userSocketMap[userId];
          break;
        }
      }

      io.emit(
        "online-users",
        Object.keys(userSocketMap)
      );

      console.log(
        "Usuario desconectado:",
        socket.id
      );
    });
  });
};

export const getReceiverSocketId = (
  userId: string
) => {
  return userSocketMap[userId];
};

export const getIO = () => {
  if (!io) {
    throw new Error(
      "Socket.io not initialized"
    );
  }

  return io;
};