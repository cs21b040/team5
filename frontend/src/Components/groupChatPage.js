import React, { useState, useEffect } from 'react';
import './Styles/groupChatPage.css';
import { Card, InputGroup, FormControl, Button } from 'react-bootstrap'; // Import relevant Bootstrap components
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../context/chatProvider';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import io from 'socket.io-client';
const EndPoint = "http://localhost:5000";
var socket,selectedGroupCompare;
function GroupChatPage() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socketConnected, setSocketConnected] = useState(false);
    const {
        user,
        selectedGroup,
        setSelectedGroup,
    } = ChatState ();
    useEffect(() => {
        socket=io(EndPoint);
        if(user){
          socket.emit('setup',user);
          socket.on("connected",()=>{
          console.log("FrontEnd : Socket connected");
          setSocketConnected(true);
        });}
      },[user]);
      useEffect(() => {
        if(!selectedGroup) return;
        console.log(selectedGroup._id);
        fetchMessages();
        selectedGroupCompare=selectedGroup;
      }, [selectedGroup]);
      useEffect(() => {
        if(!socket) return;
        socket.on("message recieved",(newMessageRecieved)=>{
          if(!selectedGroupCompare || newMessageRecieved.chat._id!==selectedGroupCompare._id) {
            //TODO :: give notification
          }
          setMessages([...messages,newMessageRecieved]);
        })
      })
    const sendMessage = async () => {
        // socket.emit("stop typing",selectedGroup._id);
        console.log(selectedGroup._id);
        try {
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          };
          console.log(selectedGroup._id)
          const { data } = await axios.post('http://localhost:5000/api/messages', {
            chatId: selectedGroup._id,
            content: newMessage,
          }, config);
          setNewMessage('');
          // socket.emit("new msg",data);
          setMessages([...messages, data]);
        } catch (err) {
          console.error(err);
          toast.error('Error in sending message');
        }
      };
    
      const fetchMessages = async () => {
        if (!selectedGroup) return;
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.get(`http://localhost:5000/api/messages/${selectedGroup._id}`, config);
          setMessages(data);
          // socket.emit("join room",selectedGroup._id);
        } catch (error) {
          console.error(error);
        }
      };
      
    return (
        <div className="main">
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} draggable theme="light" />
          <div className="chat-container">
            <div className="message-list">
            <div className="chat-header">
              <div className="chat-header-user">
                <Card>
                    <Card.Body className='headerText'>
                    <Card.Text>{selectedGroup?.chatName}</Card.Text>
                    </Card.Body>
                </Card>
              </div>
            </div>
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
              <InputGroup>
                <FormControl
                  type="text"
                  placeholder="Type your message here..."
                  value={newMessage}
                  onChange={(event) => {
                    setNewMessage(event.target.value);
                  }}
                  onKeyDown={(event) => event.key === 'Enter' && sendMessage()}
                />
                <Button variant="primary" onClick={sendMessage}>Send</Button>
              </InputGroup>
            </div>
        </div>
      );
}

export default GroupChatPage
