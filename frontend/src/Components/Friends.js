import React from 'react';
import {useState,useEffect} from 'react';
import {FaSearch} from 'react-icons/fa';
import SideDrawer from './SideDrawer';
import Card from 'react-bootstrap/Card';
import {ChatState} from '../context/chatProvider';
import axios from 'axios';
function Friends () {
  const {
    selectedChat,
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState ();
  const [currentUser, setCurrentUser] = useState ('');
  const [show, setShow] = useState (false);
  const fetchChats = async () => {
    if(!user) return;
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      const {data} = await axios.get('http://localhost:5000/api/chat', config);
      setChats (data);
    } catch (err) {
      console.log (err);
    }
  }
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [user])
  return (
    <div style={{marginTop: '1rem'}}>
      <h1 style={{margin: '0'}}>Friends</h1>
      <FaSearch
        className="search-icon"
        style={{
          marginLeft: '15px',
          backgroundColor: '#212529',
          margin: '0',
          border: '0',
          color: '#ffffff8c',
        }}
        onClick={()=>{
          setShow(true);
        }}
      />
      {chats.map((chat,index)=>{
            console.log(chat);
          return (<Card
            key={index}
            className="chatListCard"
            onClick={() => {
              setSelectedChat(chat)
              console.log(selectedChat)
            }}
          >
            <Card.Body>
              <Card.Title>{chat.chatName}</Card.Title>
              <Card.Text>{chat.lastMessage}</Card.Text>
            </Card.Body>
          </Card>)
        })}
      <SideDrawer show={show} setShow={setShow} />
    </div>
  );
}

export default Friends;
