import React from 'react';
import './../Components/Styles/research.css';
import { useLocation } from 'react-router-dom';
import '../Components/Styles/projectdetails.css'

function ProjectDetails() {
  const location = useLocation();
  const project = location.state.project;

  return (
    
    <div className='projectdetails'>
      {console.log(project)}
      <div className='projectdetails'>
        <h1>Details of the project</h1>
        <div className='projectdetails'>
          <h4>Title:</h4>
          <p>{project.title}</p>
        </div>
        <div className='projectdetails'>
          <h4>Professor:</h4>
          <p>{project.professor}</p>
        </div>
        <div className='projectdetails'>
          <h4>Description:</h4>
          <p style={{whiteSpace:'break-spaces'}}>{project.description}</p>
        </div>
        <div className='projectdetails'>
          <h4>Institute:</h4>
          <p>{project.institute}</p>
        </div>
        <div className='projectdetails'>
          <h4>Date:</h4>
          <p>{project.updatedAt.substring(0,10)}</p>
        </div>
        <div className='projectdetails'>
          <h4>Abstract:</h4>          
          <p style={{whiteSpace:'break-spaces'}}>{project.abstract}</p>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;