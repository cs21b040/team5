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
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import {TypeAnimation} from 'react-type-animation';
function Research() {
  const {
    user,
  } = ChatState();
  const [searchText, setSearchText] = useState('');
  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
  };
  function add_click() {
    document.getElementById("lightbox").style.display = "block";
  }
  function DisplayCards() {
    const [projects, setProjects] = useState([]);
    const fetchData = async () => {
      console.log('Fetching data...');
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

    const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchText.toLowerCase()) ||
    project.professor.toLowerCase().includes(searchText.toLowerCase()) ||
    project.institute.toLowerCase().includes(searchText.toLowerCase())
    );
    return (
      <div className='CardGroup'>
        {filteredProjects.map((project, key) => {
          return (
            <Project
            key={key}
            projectInfo={project}
            projectKey= {key}
          />
          )})}
      </div>
    );
  }
          
  function GetUserInfo() {
    const userInfo = sessionStorage.getItem('userInfo');
    const addProjectButton = document.querySelector('.addProjectButton');
    if (userInfo) {
      if(JSON.parse(userInfo).userType==='Professor'){
        if (addProjectButton) {
          addProjectButton.style.display = 'block';
        }
      }
      else {
        if (addProjectButton) {
          addProjectButton.style.display = 'none';
        }
      }
    }
    else {
      console.log('User Not Found');
    }
  }
  useEffect(() => {
    GetUserInfo();
  }, []);
  return (
    <div >
      <Header />
      <div className="templateContainer">
        <div className="searchInput_Container">
          <input
            className="searchInput"
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={handleSearchInputChange}
          />
        </div>
      </div>
      <div className='research'>
        <CardGroup className='CardGroup'>
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
        <button className='btn btn-success addProjectButton' onClick={add_click} style={{display: 'none'}}>Add Project</button>
      </div>
    </div>
  );
}

export default Research;