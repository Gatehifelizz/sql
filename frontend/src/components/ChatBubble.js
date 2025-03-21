import { Box, Text } from "@chakra-ui/react";

const ChatBubble = ({ message, isSender, isReceiver }) => {
  return (
    <Box
      bg={isSender ? "teal.500" : "gray.300"} 
      color={isSender ? "white" : "black"} 
      borderRadius="20px" 
      padding="10px 15px" 
      maxWidth="70%" 
      alignSelf={isSender ? "flex-end" : "flex-start"} 
      
      marginY="5px" 
    >
      <Text fontSize="sm">{message.text}</Text>
    </Box>
  );
};

export default ChatBubble;
