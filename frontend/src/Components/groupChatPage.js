import React, { useState, useEffect} from 'react';
import './Styles/groupChatPage.css';
import { Card, InputGroup, FormControl, Button } from 'react-bootstrap'; 
import { ChatState } from '../context/chatProvider';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import io from 'socket.io-client';
import { IoMdTrash } from 'react-icons/io';
import Spinner from 'react-bootstrap/Spinner';
import { CloseButton } from 'react-bootstrap';
import { FiPlusSquare } from 'react-icons/fi';
import { BiCloudUpload } from 'react-icons/bi';
import Dropdown from 'react-bootstrap/Dropdown';
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
    const messagesEndRef=React.useRef(null);
    const [imgClick,setImgClick]=useState(false);
    const [userProfile,setUserProfile]=useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
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
        fetchMessages();
        selectedGroupCompare=selectedGroup;
      }, [selectedGroup]);
      useEffect(() => {
        if(!socket) return;
        socket.on("grp message recieved",(newMessageRecieved)=>{
          if(!selectedGroupCompare || newMessageRecieved.chat._id!==selectedGroupCompare._id) {
          }
          else {
            setMessages([...messages,newMessageRecieved]);
          }
        })
        socket.on("grp delete msg",()=>{
          fetchMessages();
        })
      })
      const downloadFile = async (buffer)=>{
        try {
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.get(`http://localhost:5000/api/messages/download/${buffer._id}`, config,);
          const fileURL = "/" + data.status;
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
      function upload(){
        document.getElementById("lightbox2").style.display="block";
      }
      async function onSubmit() {
        if(!selectedFile){
          alert("Please select a file");
          console.log("Please select a file");
          return;
        }
        const formData=new FormData();
        formData.append('file',selectedFile);
        console.log(selectedGroup._id);
        formData.append('chatId',selectedGroup._id)
        console.log(formData);
        try{
          const {data}=await axios.post('http://localhost:5000/api/messages/', formData, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'multipart/form-data'
          }})
          setNewMessage('');
          socket.emit("new msg",data);
          setMessages([...messages, data]);
          document.getElementById("lightbox2").style.display = "none";
        }
         catch (err) {
          console.error(err);
          toast.error('Error in sending message');
        }
      };
      useEffect(() => {
        if(!messagesEndRef.current) return;
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }, [messages]);
    return (
        <div className="groupchatpage">
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} draggable theme="light" />
          {
            imgClick &&
            <Modal centered show={imgClick} onHide={()=>{setImgClick(false);}}>
              <Modal.Body>
                <CloseButton onClick={()=>{setImgClick(false)}}/>
                <div className="container">
                    <div className="row">
                    <div className="col d-flex justify-content-center">
                        <img
                        src={userProfile?.pic} style={{
                            height:"10.5rem"}} />
                    </div>
                    <div className="col justify-content-center">
                        <p>Name: {userProfile?.name}</p>
                        <p>Email: {userProfile?.email}</p>
                        <p>Branch: {userProfile?.branch}</p>
                        <p>College: {userProfile?.collegeName}</p>
                        <p>Role: {userProfile?.userType}</p>
                    </div>
                    </div>
                    
                </div>
              </Modal.Body>
          </Modal>
          }
          <div className="chat-container"  >
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
                      clear:'both'
                    }}
                    onClick={
                      ()=>{
                        setUserProfile(message.sender);
                        setImgClick(true);
                      }
                    }/>:<div style={{
                      width: '40px',
                      height: '40px',
                      marginRight: '10px',
                      float: message.sender._id === user._id ? 'right' : 'left',
                      clear:'both'
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
                    position: 'relative',
                    float: message.sender._id === user._id ? 'right' : 'left',
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
              {message.sender._id===user._id &&<IoMdTrash onClick={async ()=>{
                try {
                  const config = {
                    headers: {
                      Authorization: `Bearer ${user.token}`,
                    },
                  };
                  const { data } = await axios.delete(`http://localhost:5000/api/messages/delete/${message._id}`, config);
                  fetchMessages();
                  console.log(selectedGroup?._id)
                  socket.emit("grp delete msg",(selectedGroup?._id));
                } catch (error) {
                  console.log(error);
                }
              }}/>}
            </div>
                </div>
              ))}
            <div ref={messagesEndRef}></div>
            </div>
          </div>
          <div id='lightbox2'>
  <CloseButton 
  className='close2'
  onClick={() => {
    document.getElementById("lightbox2").style.display = "none";
  }}
  />
  <div className='content'>
      <BiCloudUpload size={150} color='black'/>
      <form>
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
      </form>
      <button className='btn btn-primary' onClick={onSubmit}>Submit</button>
    </div>
</div>
          <div style={{
            marginBottom:'3rem'
          }}>
            {/* give some space && auto scroll */}
          </div>
    <div className="message-input">
      {selectedGroup && <InputGroup className={!selectedGroup ? 'passive' : ''}>
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
            var timerLength=300;
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
      </InputGroup>}
    </div>
        </div>
      );
}

export default GroupChatPage;