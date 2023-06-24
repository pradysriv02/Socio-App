import Chat from "../models/Chat.js";
import User from "../models/User.js";

export const createChat = async(req,res) => {
    const newChat = new Chat({
        members:[req.body.senderId,req.body.recieverId]
    });

    try {
     const result = await newChat.save();
     res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

export const getChats = async(req,res) => {
    try {
        const chats = await Chat.find({
            members:{$in:[req.params.userId]}
        });

        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

export const getSpecificChats = async(req,res) => {
    try {
        const specificChats = await Chat.findOne({
            members:{$all:[req.params.firstId,req.params.secondId]}
        });
        res.status(200).json(specificChats);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};