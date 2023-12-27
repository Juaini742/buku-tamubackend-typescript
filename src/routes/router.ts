import express from "express";
import {logout} from "../controllers/user.controller";
import {validateToken} from "../middleware/auth.middleware";
const router = express.Router();
const authRouter = require("./auth.router");
const criticRouter = require("./critic.router");
const guestRouter = require("./guest.router");

router.use("/", authRouter);

//scured
router.use([validateToken]);
router.post("/logout", logout);
router.use("/", criticRouter);
router.use("/", guestRouter);

export default router;
