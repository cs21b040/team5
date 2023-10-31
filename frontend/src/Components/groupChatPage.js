import React, { useState, useEffect } from 'react';
import './Styles/groupChatPage.css';
import { Card, InputGroup, FormControl, Button } from 'react-bootstrap'; // Import relevant Bootstrap components
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
    const [typing,setTyping]=useState(false);
    const [isTyping,setIsTyping]=useState(false);
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
          socket.on("typing",()=>{
            setIsTyping(true);
          });
          socket.on("stop typing",()=>{
            setIsTyping(false);
          });
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
        socket.on("grp message recieved",(newMessageRecieved)=>{
          if(!selectedGroupCompare || newMessageRecieved.chat._id!==selectedGroupCompare._id) {
            //TODO :: give notification
          }
          console.log("grp message recieved");
          setMessages([...messages,newMessageRecieved]);
        })
      })
    const sendMessage = async () => {
        socket.emit("stop typing",selectedGroup._id);
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
          socket.emit("new group msg",data);
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
          socket.emit("join room",selectedGroup._id,user._id);
        } catch (error) {
          console.error(error);
        }
      };
      
    return (
        <div className="groupchatpage">
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} draggable theme="light" />
          <div className="chat-container">
            <div className="message-list">
            <div className="chat-header1">
              <div className="chat-header-user1">
                <Card className='headerCard1'>
                    <Card.Body className='headerText1'>
                    <Card.Text className='text1'>{selectedGroup?.chatName}</Card.Text>
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
                         alignItems:"center"
                         }} />
                      </Col>
                      <Col>
                        <Card.Body>
                          <Card.Title style={{fontWeight: 'bold'}}>{message.sender.name}</Card.Title>
                        <Card.Text>
                          {message.content}
                        </Card.Text>
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
                if(!socket) return;
                if(!typing){
                  socket.emit("typing",selectedGroup._id);
                }
                let lastTypingTime=Date.now();
                var timerLength=30;
                setTimeout(()=>{
                  var timeNow=Date.now();
                  var timeDiff=timeNow-lastTypingTime;
                  if(timeDiff>=timerLength && typing){
                    socket.emit("stop typing",selectedGroup._id);
                    setTyping(false);
                  }
                });
              }}
              onKeyDown={(event) => event.key === 'Enter' && sendMessage()}
            />
            <Button variant="primary" className="sendbutton1" onClick={sendMessage}>Send</Button>
          </InputGroup>
            </div>
        </div>
      );
}

export default GroupChatPage
