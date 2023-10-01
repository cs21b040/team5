import React from 'react';
import Header from '../Components/Header';
import Project from '../Components/Research-card';
import CardGroup from 'react-bootstrap/CardGroup';
import { useState, useEffect } from 'react';
import Add_project from '../Components/Add-project';
import { ChatState } from '../context/chatProvider';
import axios from 'axios';

function Research() {
  const {
    user,
  } = ChatState();

  function add_click() {
    document.getElementById("lightbox").style.display = "block";
  }

  function DisplayCards() {
    const [projects, setProjects] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
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
  
      fetchData();
    }, []); // Empty dependency array ensures useEffect runs once on component mount
  
    return (
      <div>
        {projects.map((project) => (
          <Project
            key={project.id} // Don't forget to add a unique key when mapping over elements
            title={project.title}
            professor={project.professor}
            desc={project.description}
            date='2021-01-01'
            institute={project.institute}
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      <Header />
      <h3>Research</h3>
      <div className='container'>
        <CardGroup>
          <div id='lightbox'>
            <Add_project />
          </div>
          <DisplayCards />
        </CardGroup>
      </div>
      <div>
        <button className='btn btn-success addProjectButton' onClick={add_click}>Add Project</button>
      </div>
    </div>
  );
}

export default Research;