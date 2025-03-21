// import axios from "axios";


// const handleSendMessage = async () => {
//     if (!message.trim()) return;
//     const newMessage = { text: message, sender: userInfo.name };
  
//     try {
//       const { data } = await axios.post(
//         "/api/messages",
//         {
//           message: newMessage.text,
//           media: [],
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${userInfo.token}`,
//           },
//         }
//       );
  
//       socket.emit("sendMessage", data);
  
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//       setMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error.response || error.message);
//     }
//   };

//   export { handleSendMessage };