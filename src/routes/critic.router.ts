const express = require("express");
import {
  addCritic,
  deleteCriticById,
  getAllCritic,
  getCriticByUserId,
  updateCritic,
} from "../controllers/critic.controller";
const router = express.Router();

router.get("/critics", getAllCritic);
router.get("/critics/:user_id", getCriticByUserId);
router.post("/critics", addCritic);
router.delete("/critics/:id", deleteCriticById);
router.put("/critics/:id", updateCritic);

module.exports = router;
