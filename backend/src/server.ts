import http from "http";

import app from "./app";

import { initializeSocket } from "./socket";

const server = http.createServer(app);

initializeSocket(server);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
