import React, { useState, useEffect } from 'react';
import './Styles/groupChatPage.css';
import { Card, InputGroup, FormControl, Button } from 'react-bootstrap'; // Import relevant Bootstrap components
import { ChatState } from '../context/chatProvider';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import io from 'socket.io-client';
import Spinner from 'react-bootstrap/Spinner';
import { CgSoftwareDownload } from 'react-icons/cg';
import Modal from 'react-bootstrap/Modal';
import {TypeAnimation} from 'react-type-animation';
const EndPoint = "http://localhost:5000";
var socket,selectedGroupCompare;
function GroupChatPage() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing,setTyping]=useState(false);
    const [isTyping,setIsTyping]=useState(false);
    const [loading,setLoading]=useState(false);
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
        // console.log(selectedGroupCompare?._id);
        if(selectedGroupCompare){
          console.log(selectedGroupCompare._id+ " "+user._id);
          socket.emit('user left',(user._id,selectedGroupCompare._id));
        }
        fetchMessages();
        selectedGroupCompare=selectedGroup;
      }, [selectedGroup]);
      useEffect(() => {
        if(!socket) return;
        socket.on("grp message recieved",(newMessageRecieved)=>{
          if(!selectedGroupCompare || newMessageRecieved.chat._id!==selectedGroupCompare._id) {
            //TODO :: give notification
          }
          else setMessages([...messages,newMessageRecieved]);
          console.log("grp message recieved");
        })
      })
      const downloadFile = async (buffer)=>{
        console.log(buffer)
        try {
          const config = {
            headers: {
              'Content-Type': 'application/json',
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
        setLoading(true);
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
          setLoading(false);
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
            {
              loading && <Modal centered show={loading}>
                <Modal.Body>
                  <Spinner /> 
                  <TypeAnimation
                    sequence={["Loading ...",]}
                    cursor=""
                    speed={5}
                    style={{ fontSize: "1rem",marginLeft:"1rem" }}
                    />
                </Modal.Body>
              </Modal>
            }
              {!loading && messages.map((message, index) => (
                <div key={index} className={`message ${message.sender === user.userId ? 'sent' : 'received'}`}>
                  {
                    index===0 || messages[index-1].sender._id!==message.sender._id ?
                    <img src={message.sender.pic}
                      style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      marginRight: '10px',
                      float: message.sender._id === user._id ? 'right' : 'left',
                    }}/>:<div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      marginRight: '10px',
                      float: 'left',
                      }}></div>
                  }
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
