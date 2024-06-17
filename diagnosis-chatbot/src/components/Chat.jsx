import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Chat.css";
import TypingEffect from "../hooks/TypingEffect";
import botAvatar from "../assets/bot-avator.png";
import userAvatar from "../assets/user-avator.jpeg";

const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const initialBotMessage =
      "How can I help you? Please provide your symptoms!";
    setMessages([{ sender: "bot", text: initialBotMessage }]);
  }, []);

  const handleSend = async () => {
    if (input.trim() === "") return; // Prevent sending empty messages

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    const payload = {
      symptoms: input,
    };

    try {
      const response = await axios.post(
        `http://localhost:8000/predict`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Get the top 3 results from the response
      const results = response.data.results;
      const formattedResults = results
        .map((result, index) => {
          return `${index + 1}. Disease: ${
            result.condition
          }\n Recommendation: ${result.recommendation}`;
        })
        .join("\n\n");

      const botMessage = `Here are the possible diseases and their recommendations:\n\n${formattedResults}`;

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: botMessage },
      ]);
      setInput(""); // Clear the input field
    } catch (error) {
      console.error("Error:", error); // Log the error message
      const botMessage = "Error in prediction";
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: botMessage },
      ]);
      setInput(""); // Clear the input field
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="App">
      <div className="header">
        <h1>ArogyaBot</h1>
      </div>
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message-container ${msg.sender}`}>
              <img
                src={msg.sender === "bot" ? botAvatar : userAvatar}
                alt={`${msg.sender} avatar`}
                className="avatar"
              />
              <div className={`chat-message ${msg.sender}`}>
                {msg.sender === "bot" ? (
                  <TypingEffect text={msg.text} />
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            placeholder="Enter your symptoms..."
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
