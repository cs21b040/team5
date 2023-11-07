import React,{useEffect} from 'react'
import Header from './../Components/Header.js';
import SideBar from  './../Components/sideBar.js';
import GroupChatPage from './../Components/groupChatPage.js';
import '../Components/Styles/home.css';
function Home() {
  return (
    <div>
      <Header/>
      <div className="divide">
        <div className="left1"><SideBar/></div>
        <div className='right1'><GroupChatPage/></div>
      </div>
    </div>
  )
}
export default Home