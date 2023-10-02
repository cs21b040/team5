import React from 'react'
import {useState ,useEffect} from 'react';
import './Styles/chatPage.css';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { ChatState } from "../context/chatProvider";
import axios from 'axios';
import { ToastContainer,toast} from 'react-toastify';
function ChatPage() {
  const {
    selectedChat,
    setSelectedChat,
    user,
    chats,
    setChats,
  }=ChatState();
  const [currentUser,setCurrentUser]=useState("");
  const [messages,setMessages]=useState([]);
  const [newMessage,setNewMessage]=useState("");
  const sendMessage=async(event)=>{
    if(event.key=="Enter" && newMessage!==""){
      try{
        const config={
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const {data}= await axios.post("http://localhost:5000/api/messages",{
          chatId:selectedChat._id,
          content:newMessage,
        },config);
        console.log(data);
        setMessages([...messages,data]);
      }catch(err){
        console.log(err);
        toast("Error in sending message");
      }
    }

  }
  const fetchMessages=async()=>{
    if(!selectedChat) return ;
    try {
      const config={
        headers:{
          Authorization:`Bearer ${user.token}`,
        },
      };      
      const {data}=await axios.get(`http://localhost:5000/api/messages/${selectedChat._id}`,config);
      setMessages(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    fetchMessages();
  }, [selectedChat])
  
  return (
    <div className="main">
      <ToastContainer position="top-right" autoClose={5000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick
        rtl={false}
        draggable
        theme="light"/>
      {/* <input type="button" onClick={fetchChats} /> */}
      <input type="text" onKeyDown={sendMessage} value={newMessage} onChange={
        (event)=>{
          setNewMessage(event.target.value);
        }
      }/>
      <ul style={{listStyle:"none"}}>
        {messages.map((message,index)=>{
          return(
            <li>
              <Card >
                <Card.Body>
                  <Card.Title>{message.sender.name}</Card.Title>
                  <Card.Text>{message.content}</Card.Text>
                </Card.Body>
              </Card>
            </li>
          )
        })}
      </ul>
      <input type="submit" onClick={fetchMessages} />
    </div>
  )
}

export default ChatPage;
