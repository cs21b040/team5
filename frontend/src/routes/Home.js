import React, { useEffect } from 'react'
import Header from './../Components/Header.js';
import SideBar from './../Components/sideBar.js';
import GroupChatPage from './../Components/groupChatPage.js';
import { ChatState } from '../context/chatProvider';
import '../Components/Styles/home.css';
function Home() {
  const {
    selectedGroup,
  } = ChatState();
  return (
    <div>
      <Header />
      <div className="divide">
        <div className={!selectedGroup ?"left1":'hide'}><SideBar /></div>
        <div className={selectedGroup ?'right1':'hide'}><GroupChatPage /></div>
      </div>
    </div>
  )
}
export default Home