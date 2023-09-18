import { Search } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";

import FlexBetween from "../../components/FlexBetween";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import Conversation from "../../components/Conversation";
import ChatBox from "../../components/ChatBox";
import { io } from "socket.io-client";
import { useRef } from "react";

const InboxLeftSide = ({ userId }) => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [chats, setChats] = useState([]);
  const [currentChats, setCurrentChats] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [recievedMessage, setRecievedMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { palette } = useTheme();
  const neutralLight = palette.neutral.light;

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", userId);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  const getChats = async () => {
    const response = await fetch(`http://localhost:3001/chats/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setChats(data);
  };

  useEffect(() => {
    getChats();
  }, []);

  //Send message to socket server
  useEffect(() => {
    if (sendMessage != null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  //Recieve message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      setRecievedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== userId);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <Box display="grid" gridTemplateColumns="22% auto" gap="1rem">
      <Box display="flex" flexDirection="column" gap="1rem">
        <Box
          display="flex"
          flexDirection="column"
          gap="1rem"
          borderRadius="1rem"
          p="1rem"
          height="auto"
          minHeight="80vh"
          overflow="scroll"
          sx={{ backgroundColor: neutralLight }}>
          <h2>Chats</h2>
          <Box display="flex" flexDirection="column" gap="1rem">
            {chats.map((chat) => {
              return (
                <div onClick={() => setCurrentChats(chat)}>
                  <Conversation
                    chatData={chat}
                    currentUserId={userId}
                    online={checkOnlineStatus(chat)}
                  />
                </div>
              );
            })}
          </Box>
        </Box>
      </Box>
      <Box display="grid" gridTemplateColumns="100% auto">
        <Box>
          <ChatBox
            chatData={currentChats}
            currentUser={userId}
            setSendMessage={setSendMessage}
            recievedMessage={recievedMessage}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default InboxLeftSide;
