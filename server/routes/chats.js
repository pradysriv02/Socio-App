import express from "express";
import { verifyToken } from "../middleware/auth.js";
import  {createChat, getChats, getSpecificChats } from "../controllers/chats.js";

const router=express.Router();

router.post("/",createChat);
router.get("/:userId",verifyToken,getChats);
router.get("/find/:firstId/:secondId",verifyToken,getSpecificChats);

export default router;