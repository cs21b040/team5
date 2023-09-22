import React from 'react'
import Header from './../Components/Header.js';
import SideBar from './../Components/sideBar1.js';
import SubDiscuss from './../Components/SubDiscuss.js';
import './Academic.css';
import { useParams } from 'react-router-dom';

function Academic() {
  const { branch } = useParams();
  return (
    <div>
      <Header/>
      <div className="app">
        <div className="app_body">
          <SideBar branch={branch}/>
          <SubDiscuss/>
        </div>
      </div>
      
    </div>
  )
}

export default Academic
