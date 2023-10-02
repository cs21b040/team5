import React from 'react'
import Header from './../Components/Header.js';
import Friends from  './../Components/Friends.js';
import ChatPage from './../Components/chatPage.js';
import './personalChat.css';
function personalChat() {
  return (
    <div>
      <Header/>
      <div className="divide">
        <div className="left" style={{overflowX:"auto"}}><Friends/></div>
        <div className="right" style={{overflowX:"auto"}}><ChatPage/></div>
      </div>
    </div>
  )
}
export default personalChat
