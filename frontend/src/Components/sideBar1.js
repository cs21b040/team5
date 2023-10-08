import React from 'react';
import './Styles/sideBar1.css';
import Subjects from './Subjects.js';
import axios from 'axios';
import {useEffect} from 'react';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { ChatState } from '../context/chatProvider';

function Sidebar({ branch, onSelect }) {
  const {user,} = ChatState();
  // const navigate = useNavigate();
  const [subs, setSubs] = useState([]);
  const GetSubjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/academics/subjects',{params: { branchName: branch }});
      if (response.status === 200) {
        setSubs(response.data);
      } else {
        console.log("Unexpected response status:", response.status);
      }
    } catch (err) {
      console.error("Error fetching branches:", err);
    }
  };
  useEffect(()=>{
    GetSubjects();
  },[user,subs]);

  const handleSubjectClick = (subjectName) => {
    onSelect(subjectName); 
  };

  
  async function addSubject(){
    const sub=document.getElementById('sub').value.toString();
    console.log(sub);
    try {
      const response = await axios.post('http://localhost:5000/api/academics/subjects',{branchName:branch,subjectName:sub});
      if (response.status === 200) {
        // navigate(`/Academic/${br}`);
      } else {
        console.log("Unexpected response status:", response.status);
      }
    } catch (err) {
      console.error("Error submitting the project:", err);
    }
  }

  return (
    <div className='sidebar'>
        <div className="sidebar__header">
            <h5>{branch}</h5>
        </div>
        <div className="sidebar_subjects">
          {subs.map((sub,key)=>(
            <Subjects key={key} subject={sub.name} onClick={() => handleSubjectClick(sub.name)}/>
          ))}
        </div>
        <div className="add_subject__wrapper">
          <Form className="add_subject__form">
            <Form.Group className="mb-3" controlId="sub">
                <Form.Control placeholder="Enter Subject"  />
                <button onClick={addSubject}>ADD</button>
            </Form.Group>
          </Form>
        </div>
    </div>

  )
}

export default Sidebar