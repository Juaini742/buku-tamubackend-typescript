import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
const cookieParser = require("cookie-parser");

import router from "./routes/router";

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors({origin: true, credentials: true}));

app.use(cookieParser());

app.use("/api", router);
app.listen(process.env.SERVER_PORT, () => {
  console.log("Server Running");
});
