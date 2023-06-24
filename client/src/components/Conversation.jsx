
import { Box, Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import UserImage from "./UserImage";


const Conversation = ({chatData, currentUserId, online}) => {
    const{palette} = useTheme();
    const primaryLight=palette.primary.light;
    const token = useSelector((state) => state.token);
    const [getUserChats,setGetUserChats] = useState(null);
    const [otherUser,setOtherUser] =useState(null);
    const[messages,setMessages] = useState([]);
    const [isOnline,setIsOnline] = useState("Online");
    const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
    const otherId = chatData.members.filter((id) => id!==currentUserId);
    
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
        otherIdData();
    },[]);

    
   
    
    
    return(
        <Box
        sx={{"::-webkit-scrollbar":{
            display:"none",
            width:"0"
        }}}
        >
        <Box
        overflow="none"
        display="flex"
        borderRadius="0.5rem"
        gap="1.5rem"
        sx={{"&:hover":{
            backgroundColor:primaryLight,
            cursor:"pointer"
        }}}
        >
        <UserImage image={otherUser? (otherUser.picturePath):(null)}/>
        {isNonMobileScreens && (
            <Box display="flex" flexDirection="column" gap="0.25rem">
            <Typography variant="h5">{otherUser? (otherUser.firstName+" "+otherUser.lastName):("null")}</Typography>
            <Typography sx={{m:"0.5rem 0"}} variant="h6">{online ? ("Online"):("Offline")}</Typography>
        </Box>
        )}
        {!isNonMobileScreens && (
            <Box display="flex" flexDirection="column" gap="0.25rem">
            
        </Box>
        )}
       
        </Box>
        <Divider sx={{m:"0.25rem 0"}}/>
        </Box>
    );
};

export default Conversation;