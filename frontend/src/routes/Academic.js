import React from 'react'
import Header from './../Components/Header.js';
import SideBar from './../Components/sideBar1.js';
import SubDiscuss from './../Components/SubDiscuss.js';
import './Academic.css';
function Academic() {
  return (
    <div>
      <Header/>
      <div className="app">
        <div className="app_body">
          <SideBar/>
          <SubDiscuss/>
        </div>
      </div>
      
    </div>
  )
}

export default Academic
