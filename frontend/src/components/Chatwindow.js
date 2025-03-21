import { Box, Button, Flex, Input, IconButton, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { IoHappy, IoSend, IoAttach } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";

import ChatBubble from "./ChatBubble";

const socket = io(process.env.REACT_APP_API_URL || "http://localhost:3000");

const Chatwindow = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("typing", () => setIsTyping(true));
    socket.on("stopTyping", () => setIsTyping(false));

    return () => {
      socket.off("receiveMessage");
      socket.off("connect_error");
    };
  }, []);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    const newMessage = { text: message, sender: userInfo.name };
  
    try {
      const { data } = await axios.post(
        "/api/messages",
        {
          message: newMessage.text,
          media: [],
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        } 
      );
  
      socket.emit("sendMessage", data);
  
      setMessages((prevMessages) => [...prevMessages, data]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error.response || error.message);
    }
  };

  const handleTyping = () => {
    socket.emit("typing");
    setTimeout(() => socket.emit("stopTyping"), 2000);
  };

  const addEmoji = (event, emojiObject) => {
    setMessage(message + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      bottom="80px"
      right="20px"
      width="600px"
      bg="white"
      boxShadow="lg"
      borderRadius="md"
      zIndex="2000"
    >
      <Flex direction="column" height="500px">
        <Box bg="teal.500" color="white" p="4">
          <Text fontSize="lg" fontWeight="bold">
            Chat
          </Text>
        </Box>
        <Box
          flex="1"
          p="4"
          display={"flex"}
          overflowY={"auto"}
          direction="column"
        >
          {messages.map((message, index) => (
            <ChatBubble
              key={index}
              message={message}
              isSender={message.sender === userInfo.name}
            />
          ))}
        </Box>
        <Flex p="4" alignItems="center">
          <IconButton
            icon={<IoHappy />}
            mr="2"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          />
          {showEmojiPicker && (
            <Box position="absolute" bottom="60px">
              <EmojiPicker onEmojiClick={addEmoji} />
            </Box>
          )}
          <Input
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            mr="2"
          />
          <IconButton
            icon={<IoSend />}
            colorScheme="teal"
            onClick={handleSendMessage}
            isRound
          />
        </Flex>
        <Button colorScheme="red" onClick={onClose} width="100%">
          Close
        </Button>
      </Flex>
    </Box>
  );
};

export default Chatwindow;
