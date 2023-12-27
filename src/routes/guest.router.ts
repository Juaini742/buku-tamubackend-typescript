const express = require("express");
import multer from "multer";
import {
  addGuest,
  deleteGuestById,
  getAllGuets,
  getGuestByUserId,
} from "../controllers/guest.controller";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

router.get("/guests", getAllGuets);
router.get("/guests/:user_id", getGuestByUserId);
router.post("/guests", upload.single("file"), addGuest);
router.delete("/guests/:id", deleteGuestById);

module.exports = router;
