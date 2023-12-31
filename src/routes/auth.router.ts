import {validateToken} from "../middleware/auth.middleware";
import {refreshToken} from "../controllers/refresh.token";
import {
  getUser,
  register,
  login,
  update,
  getUserByToken,
} from "../controllers/user.controller";
const express = require("express");
import multer from "multer";
import {PDFDownload} from "../controllers/pdf.controller";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

router.get("/invoise/", PDFDownload);
router.get("/users", getUser);
router.get("/userToken", validateToken, getUserByToken);
router.get("/token", validateToken, refreshToken);
router.post("/register", register);
router.post("/login", login);
router.put("/users/:id", upload.single("file"), update);

module.exports = router;
