import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import UserImage from "./UserImage";
import {format} from "timeago.js";
import InputEmoji from "react-input-emoji";
import { useRef } from "react";

const ChatBox = ({chatData, currentUser, setSendMessage, recievedMessage}) => {
    
    const token = useSelector((state) => state.token);
    const [otherUser, setOtherUser] = useState(null);
    const[messages,setMessages] = useState([]);
    const[newMessage,setNewMessage] = useState("");
    const otherId = chatData?.members?.find((id) => id!==currentUser);
    const scroll = useRef();
    const {palette} = useTheme();

    const handleChange = (newMessage) => {
        setNewMessage(newMessage);
    };


    //Taking out data of the reciever user from database
    const otherIdData = async() => {
        const response = await fetch(`http://localhost:3001/users/${otherId}`,
        {
            method:"GET",
            headers:{Authorization :`Bearer ${token}`}
        });
        const thisUserData = await response.json();
        setOtherUser(thisUserData);
    };
        
    useEffect(() => {
        if(chatData!==null){
            otherIdData();
        };
    },[chatData,currentUser]);


    //Accessing the contacts/chats of the particular user from database
    const getMessages = async() => {
        const response = await fetch(`http://localhost:3001/messages/${chatData?._id}`,
        {
            method:"GET",
            headers:{Authorization:`Bearer ${token}`},
        });
        const data = await response.json();
        setMessages(data);
    };

    useEffect(() => {
        if(chatData!==null){
            getMessages();
        }  
    },[chatData]);

    useEffect(() => {
        scroll.current?.scrollIntoView({behavior:"smooth"});
    },[messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        const message = {
            "chatId":chatData._id,
            "senderId":currentUser,
            "text":newMessage
        }
        //Sending message to socket server to enable real-time messaging
        setSendMessage({...message,otherId});
        //Creating and adding a new message to the database
        const response = await fetch(`http://localhost:3001/messages/`,
        {
            method:"POST",
            headers:{Authorization:`Bearer ${token}`,
                    "content-type":"application/json"},
            body:JSON.stringify(message),
        });
        const ans= await response.json();
        console.log(ans);
        setMessages([...messages,ans]);
        setNewMessage("");

        
    };

    useEffect(() => {
        if(recievedMessage!=null && recievedMessage.chatId===chatData._id){
            setMessages([...messages,recievedMessage]);
        }
    },[recievedMessage]);
    return(
        <Box>
        <Box 
        borderRadius="1rem"
        display="grid"
        gridTemplateRows="14vh 60vh 13vh"
        >
            {chatData? (
                <Box
                padding="1rem 1rem 0 1rem"
                display="flex"
                flexDirection="column"
                >
                    <Box display="flex" gap="2rem">
                        <UserImage image={otherUser? (otherUser.picturePath):(null)}/>
                        <Typography variant="h4" mt="1.2rem">{otherUser?.firstName}   {otherUser?.lastName}</Typography>
                    </Box>
                    <Divider sx={{mt:"0.25rem"}}/>
                </Box>
            ):(
                <Box display="flex" alignItems="center" justifyContent="center" >
                <Typography variant="h2">
                    Select a chat to converse.......
                </Typography>
                </Box>
            )}
            <Box
            display="flex"
            flexDirection="column"
            gap="0.5rem"
            padding="1.5rem"
            sx={{overflow:"scroll"}}
            
            >
            {messages.map((message) => {
                return(
                    <Box display="flex" justifyContent={`${message.senderId===currentUser ? ("flex-end"):("flex-start")}`} ref={scroll}>
                        <Box
                        display="flex"
                        maxWidth="28rem"
                        width="fit-content"
                        p="0.7rem"
                        borderRadius="1rem 1rem 1rem 0"
                        sx={{backgroundColor:palette.neutral.light}}
                        flexDirection="column"
                        gap="0.5rem"
                        >
                        <Typography variant="h5">{message.text}</Typography>
                        <Typography fontSize="0.65rem">{format(message.createdAt)}</Typography>  
                        </Box>   
                    </Box>
                );
            })}
            </Box>
            <Box display="flex" mb="3rem">
                <InputEmoji value={newMessage} onChange={handleChange} />
                <Button onClick={handleSend}>Send</Button>
            </Box>
        </Box>
        
        </Box>
    );
};

export default ChatBox;