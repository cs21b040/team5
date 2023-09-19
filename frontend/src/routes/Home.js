import React,{useEffect} from 'react'
import Header from './../Components/Header.js';
import SideBar from  './../Components/sideBar.js';
import axios from 'axios';

function Home() {
  const fetchChat = async() =>{
    const data = await axios.get('http://localhost:5000/api/chat');
    console.log(data.data);
  }
  useEffect(()=>{
    fetchChat();
  },[])
  return (
    <div>
      <Header/>
      <SideBar/>
    </div>
  )
}
export default Home