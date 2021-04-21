import React, { Component, useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.css';
import ChatWindow from './ChatWindow';
import socketClient  from "socket.io-client";
import { STATES } from 'mongoose';
const SERVER = "http://localhost:3000";
var socket = socketClient(SERVER);

function ChatRoomPage() {
    const [initialized, setInitialized] = useState(false);
    const [messages, setMessages] = useState([]);
    const [rooms, setRooms] = useState([]);

    const connectToRoom = () => {
        socket.on("connect", data => {
          socket.emit("join", getChatData().chatRoomName);
        });
        socket.on("newMessage", data => {
            getMessages();
          });
          setInitialized(true);
     };
    const getRooms = async () => {
            const response = await getChatRooms();
            setRooms(response.data);
            setInitialized(true);
          };
    useEffect(() => {
            if (!initialized) {
               getMessages();
               connectToRoom();
               getRooms();
             }
    });

    return (
        <div className="chat-room-page">
          <h1>
            Chat Room: {getChatData().chatRoomName}. Chat Handle:{" "}
            {getChatData().handle}
          </h1>
          <div className="chat-box">
            {messages.map((m, i) => {
              return (
                <div className="col-12" key={i}>
                  <div className="row">
                    <div className="col-2">{m.author}</div>
                    <div className="col">{m.message}</div>
                    <div className="col-3">{m.createdAt}</div>
                  </div>
                </div>
              );
            })}
          </div>
          </div>
          );


}