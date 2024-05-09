import './Chat.css'
import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import io from "socket.io-client";
import { ChatRoom } from '../links';
import { useNavigate } from 'react-router-dom';
import home from '../img/home.png'

const socket = io.connect("http://localhost:8080");

function Chat() {
  let currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  let navigate = useNavigate();
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: ChatRoom(),
        author: currentUser.LastName,
        message: currentMessage,
        mail: currentUser.Mail,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  useEffect(() => {
    socket.emit("join_room",ChatRoom());
  }, [])

  return (
    
    <div>
       <input style={{marginTop: 50,marginright: 1184}} type="image" src={home} onClick={() => navigate('/main')} className="getHomeTop" ></input>
      <div className="chat-window appC" >
        
        <div className="chat-header">
          <p>Live Chat</p>
        </div>
        <div className="chat-body ">
          <ScrollToBottom className="message-container">
            {messageList.map((messageContent) => {
              return (
                <div
                  className="message"
                  id={currentUser.mail === messageContent.Mail ? "you" : "other"}
                >
                  <div>
                    <div className="message-content">
                      <p>{messageContent.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{messageContent.time}</p>
                      <p id="author">{messageContent.author}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={currentMessage}
            placeholder="Hey..."
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>
    
      </div>
      </div>
  );
}

export default Chat;
