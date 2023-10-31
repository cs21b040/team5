import React, { useState, useEffect } from 'react';
import './Styles/chatPage.css';
import { Card, InputGroup, FormControl, Button } from 'react-bootstrap'; // Import relevant Bootstrap components
import { useNavigate } from 'react-router-dom';
import CloseButton from 'react-bootstrap/CloseButton';
import { ChatState } from '../context/chatProvider';
import {FiPlusSquare} from 'react-icons/fi';
import{CgSoftwareDownload} from 'react-icons/cg';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';
import Col from 'react-bootstrap/Col';
import io from 'socket.io-client';
import UploadFile from './uploadFile';
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
  const downloadFile = async (buffer)=>{
    console.log(buffer)
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`http://localhost:5000/api/messages/download/${buffer._id}`, config,);
      console.log(data.status)
      const fileURL = "/" + data.status;
      console.log(fileURL);
      let alink = document.createElement("a");
      alink.href = fileURL;
      alink.download = data.status;
      alink.click();
    } catch (error) {
      console.error(error);
    }

  }
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
      socket.emit("join room",selectedChat._id,user._id);
    } catch (error) {
      console.error(error);
    }
  };
  function upload(){
    document.getElementById("lightbox").style.display="block";
  }

  return (
    <div className="main">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} draggable theme="light" />
      <div className={!selectedChat ? 'passive' : 'chat-header'}>
          <div className="chat-header-user">
            <Card className='headerCard'>
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
  <div className="message-list" >
    {messages.map((message, index) => {
      return (
      <div
        key={index}
        className={`message ${message.sender._id === user._id ? 'sent' : 'received'}`}
      >
        {/* {index===0 || message.sender._id !== messages[index-1].sender._id ? (
          <img
            src={message.sender.pic}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              marginRight: '10px',
              float: 'left',
            }}
          />
        ) : <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          marginRight: '10px',
          float: 'left',
          }}></div>} */}
<div className="message-card"
    style={{
    backgroundColor: message.sender._id === user._id ? '#DCF8C6' : 'white',
    borderRadius:'10px',
    marginLeft: '10px',
    marginRight: '10px',
    marginBottom: '4px',
    padding: '10px',
    boxShadow: '0px 2px 5px 0px rgba(0, 0, 0, 0.1)',
    display: 'inline-block',
    maxWidth: '70%',
    float: message.sender._id === user._id ? 'right' : 'left',
    clear:'both'
  }}
>
  <p style={{ margin: 0, padding: 0, display: 'inline-block' }}>
    {message.content}
    {message.file && (
        <CgSoftwareDownload style={{marginLeft:"1rem",marginRight:"0.5rem",marginTop:"10px",marginBottom:"10px"}} size={25} onClick={()=>{downloadFile(message)}}/>
    )}
  <sub style={{
    marginLeft: '10px',
    fontSize: "12px",
    color: "#888",
    verticalAlign: "sub",
    marginTop: "-6px",
  }}>
    {message.updatedAt.slice(11, 16)}
  </sub>
  </p>
</div>
</div>)})}
  </div>
</div>
<div id='lightbox'>
  <CloseButton className='close' onClick={() => document.getElementById("lightbox").style.display = "none"} />
  <UploadFile chatId={selectedChat}/>
</div>
<div className="hi" style={{paddingBottom:"10rem"}}>
{/* just to give some space  */}
</div>

  <div className="message-input">
      <div className="typing">
        {isTyping && <p>Typing...</p>}
      </div>
      <InputGroup className={!selectedChat ? 'passive' : ''}>
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
            var timerLength=300;
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
         <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
          <FiPlusSquare size={25} color={"white"} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={()=>{
              upload();
            }}>Insert File</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button variant="primary" className="sendbutton" onClick={sendMessage}>Send</Button>
      </InputGroup>
    </div>
    
  </div>
  );
}

export default ChatPage;
