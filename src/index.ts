// import dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// import cors from "cors";
// const cookieParser = require("cookie-parser");
// const socketIO = require("socket.io");

// import router from "./routes/router";

// const app = express();

// app.use(express.urlencoded({extended: true}));
// app.use(express.json());

// app.use(cors({origin: true, credentials: true}));

// app.use(cookieParser());

// app.use("/socket.io", cors());

// app.use("/api", router);

// const server = app.listen(process.env.SERVER_PORT, () => {
//   console.log("Server Running");
// });

// const io = socketIO(server, {
//   cors: {
//     origin: true,
//     methods: ["GET", "POST"],
//   },
// });

import dotenv from "dotenv";
dotenv.config();
import express, {Express} from "express";
import cors from "cors";
const cookieParser = require("cookie-parser");
import http from "http";
import {Server} from "socket.io";

import router from "./routes/router";

const app: Express = express();
const server: http.Server = http.createServer(app);
const io: Server = new Server(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
  },
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors({origin: true, credentials: true}));

app.use(cookieParser());

app.use("/socket.io", cors());

app.use("/api", router);

server.listen(process.env.SERVER_PORT, () => {
  console.log("Server Running");
});

io.on("connection", () => {
  console.log("A user connected");
});

export default app;
