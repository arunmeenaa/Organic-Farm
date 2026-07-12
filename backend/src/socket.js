const { Server } = require("socket.io");

let io;

const userSockets = new Map();

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("register", (userId) => {
      userSockets.set(userId, socket.id);
    });

    socket.on("disconnect", () => {
      for (const [userId, socketId] of userSockets.entries()) {
        if (socketId === socket.id) {
          userSockets.delete(userId);
          break;
        }
      }
    });
  });
};

const sendNotification = (userId, notification) => {
  if (!io) return;

  const socketId = userSockets.get(userId.toString());

  if (socketId) {
    io.to(socketId).emit("notification", notification);
  }
};

module.exports = {
  initializeSocket,
  sendNotification,
};
