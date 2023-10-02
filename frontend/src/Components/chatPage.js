import React, { useState, useEffect } from 'react';
import './Styles/chatPage.css';
import { Card, InputGroup, FormControl, Button } from 'react-bootstrap'; // Import relevant Bootstrap components
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../context/chatProvider';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function ChatPage() {
  const {
    selectedChat,
    user,
  } = ChatState();
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  
  const navigate = useNavigate();

  const sendMessage = async () => {
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
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  return (
    <div className="main">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} draggable theme="light" />
      
      <div className="chat-container">
        <div className="message-list">
          {messages.map((message, index) => (
            console.log(message),
            <div key={index} className={`message ${message.sender === user.userId ? 'sent' : 'received'}`}>
              <Card>
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
              onChange={(event) => setNewMessage(event.target.value)}
              onKeyDown={(event) => event.key === 'Enter' && sendMessage()}
            />
            <Button variant="primary" onClick={sendMessage}>Send</Button>
          </InputGroup>
        </div>
    </div>
  );
}

export default ChatPage;
