import React,{useEffect} from 'react'
import Header from './../Components/Header.js';
import SideBar from  './../Components/sideBar.js';
import chatPage from './../Components/chatPage.js';
import axios from 'axios';
function Home() {

  return (
    <div>
      <Header/>
      <div className="divide">
      <div><SideBar/></div>
      <div><chatPage/></div>
      </div>
    </div>
  )
}
export default Home