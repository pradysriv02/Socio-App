import Message from "../models/Message.js";


export const createMessage = async(req,res) => {
    const {chatId,senderId,text} = req.body;
    console.log(chatId,senderId,text);
    
    try {
    
    const newMessage = new Message({
        chatId:chatId,
        senderId:senderId,
        text:text,
    });

    const ans = await newMessage.save();
    res.status(200).json(ans);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
    

    
};

export const getMessage = async(req,res) => {
    const { chatId } = req.params;
    try {
        const result = await Message.find({chatId});
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};