import React,{useEffect} from 'react'
import Header from './../Components/Header.js';
import SideBar from  './../Components/sideBar.js';
import ChatPage from './../Components/chatPage.js';
import Subjects from './../Components/Subjects.js';
import axios from 'axios';
import './home.css';
function Home() {

  return (
    <div>
      <Header/>
      <div className="divide">
        <div><SideBar/></div>
        <div><ChatPage/></div>
      </div>
    </div>
  )
}
export default Home