import React from 'react';
import './Styles/sideBar1.css';
import Subjects from './Subjects.js';
import axios from 'axios';
import {useEffect} from 'react';
import { useState } from 'react';

function Sidebar({branch}) {
  const [subs, setSubs] = useState([]);
  const GetSubjects = async () => {
    const response = await axios.get('http://localhost:5000/subjects');
    setSubs(response.data); // Update subs using setSubs
  };
  useEffect(()=>{
    GetSubjects();
  },[])
  return (
    <div className='sidebar'>
        <div className="sidebar__header">
            <h5>{branch}</h5>
        </div>
        <div className="sidebar_subjects">
          {subs.map((sub)=>(
            <Subjects subject={sub.name}/>
          ))}
        </div>
    </div>

  )
}

export default Sidebar