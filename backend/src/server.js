const app = require("../src/app");
const db = require("./config/db");

const http = require("http");
const server = http.createServer(app);
const { initializeSocket } = require("./socket");

const PORT = process.env.PORT || 3000;
initializeSocket(server);
db();

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
