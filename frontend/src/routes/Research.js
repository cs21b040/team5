import React from 'react';
import Header from '../Components/Header';
import Project from '../Components/Research-card';
import CardGroup from 'react-bootstrap/CardGroup';
import CloseButton from 'react-bootstrap/CloseButton';
import { useState, useEffect } from 'react';
import Add_project from '../Components/Add-project';
import { ChatState } from '../context/chatProvider';
import axios from 'axios';
import './../Components/Styles/research.css';


function Research() {
  const {
    user,
  } = ChatState();
  function add_click() {
    document.getElementById("lightbox").style.display = "block";
  }

  function DisplayCards() {
    const [projects, setProjects] = useState([]);
    const fetchData = async () => {
      try {
        if(!user) return console.log('No user');
        const response = await axios.get('http://localhost:5000/api/research/', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const projectsData = response.data;
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    useEffect(() => {
      fetchData();
    }, []);
  
    return (
      <div className='CardGroup'>
        {projects.map((project, key) => {
          return (
          <Project 
            key={key}
            projectInfo={project}
          />
          )
        })}
      </div>
    );
  }

  function GetUserInfo() {
    const userInfo = localStorage.getItem('userInfo');
    const addProjectButton = document.querySelector('.addProjectButton');
    if (userInfo) {
      if(JSON.parse(userInfo).userType!=='Professor'){
        if (addProjectButton) {
          addProjectButton.style.display = 'none';
        }
      }
      else {
        if (addProjectButton) {
          addProjectButton.style.display = 'block';
        }
      }
    }
    else {
      console.log('User Not Found');
    }
  }

  return (
    <div >
      <Header />
      <h3>Research</h3>
      <div className='container'>
        <CardGroup>
          <div>
            <DisplayCards />
          </div>
          <div id='lightbox'>
            <CloseButton className='close' onClick={() => document.getElementById("lightbox").style.display = "none"} />
            <GetUserInfo />
            <Add_project/>
          </div>
        </CardGroup>
      </div>
      <div>
        <button className='btn btn-success addProjectButton' onClick={add_click}>Add Project</button>
      </div>
    </div>
  );
}

export default Research;