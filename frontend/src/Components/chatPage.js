import React, { useState, useEffect } from 'react';
import './Styles/chatPage.css';
import { Card, InputGroup, FormControl, Button } from 'react-bootstrap'; // Import relevant Bootstrap components
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../context/chatProvider';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import io from 'socket.io-client';
const EndPoint = "http://localhost:5000";
var socket,selectedChatCompare;
function ChatPage() {
  const {
    selectedChat,
    user,
  } = ChatState();
  useEffect(() => {
    socket=io(EndPoint);
    if(user){
      socket.emit('setup',user);
      socket.on("connected",()=>{
      console.log("FrontEnd : Socket connected");
      setSocketConnected(true);
      socket.on("typing",()=>{
        setIsTyping(true);
      });
      socket.on("stop typing",()=>{
        setIsTyping(false);
      });
    });}
  },[user]);
  useEffect(() => {
    fetchMessages();
    selectedChatCompare=selectedChat;
  }, [selectedChat]);
  useEffect(() => {
    if(!socket) return;
    socket.on("message recieved",(newMessageRecieved)=>{
      if(!selectedChatCompare || newMessageRecieved.chat._id!==selectedChatCompare._id) {
        //TODO :: give notification
      }
      setMessages([...messages,newMessageRecieved]);
    })
  })
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing,setTyping]=useState(false);
  const [isTyping,setIsTyping]=useState(false);

  const sendMessage = async () => {
    socket.emit("stop typing",selectedChat._id);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post('http://localhost:5000/api/messages', {
        chatId: selectedChat._id,
        content: newMessage,
      }, config);
      setNewMessage('');
      socket.emit("new msg",data);
      setMessages([...messages, data]);
    } catch (err) {
      console.error(err);
      toast.error('Error in sending message');
    }
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`http://localhost:5000/api/messages/${selectedChat._id}`, config);
      setMessages(data);
      socket.emit("join room",selectedChat._id);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="main">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} draggable theme="light" />
      <div className="chat-header">
          <div className="chat-header-user">
            <Card>
              <Row>
                <Col xs={1}>
                  <Card.Img src={selectedChat?.users[0].pic} style={{
                    height:"3rem",
                     width:"auto",
                     marginLeft:'5px',
                    marginTop:'5px'}} />
                </Col>
                <Col>
                  <Card.Body className='headerText'>
                    <Card.Text>{selectedChat?.users[0].name}</Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </div>
        </div>
      <div className="chat-container">
        <div className="message-list">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender === user.userId ? 'sent' : 'received'}`}>
              <Card style={{marginBottom:"1rem"}}>
                <Row>
                  <Col xs={1}>
                  <Card.Img src={message.sender.pic} style={{
                    height:"3rem",
                     width:"auto",
                     marginLeft:'5px',
                    marginTop:'5px'}} />
                  </Col>
                  <Col>
                    <Card.Body>
                    <Card.Text>{message.content}</Card.Text>
                  </Card.Body>
                  </Col>
                </Row>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <div className="message-input">
          <div className="typing">
            {isTyping && <p>Typing...</p>}
          </div>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Type your message here..."
              value={newMessage}
              onChange={(event) => {
                setNewMessage(event.target.value);
                if(!socket) return;
                if(!typing){
                  socket.emit("typing",selectedChat._id);
                }
                let lastTypingTime=Date.now();
                var timerLength=3000;
                setTimeout(()=>{
                  var timeNow=Date.now();
                  var timeDiff=timeNow-lastTypingTime;
                  if(timeDiff>=timerLength && typing){
                    socket.emit("stop typing",selectedChat._id);
                    setTyping(false);
                  }
                });
              }}
              onKeyDown={(event) => event.key === 'Enter' && sendMessage()}
            />
            <Button variant="primary" onClick={sendMessage}>Send</Button>
          </InputGroup>
        </div>
    </div>
  );
}

export default ChatPage;
