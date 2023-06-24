import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createMessage, getMessage } from "../controllers/messages.js";

const router = express.Router();

router.post("/", verifyToken,createMessage);
router.get("/:chatId", verifyToken,getMessage);

export default router;