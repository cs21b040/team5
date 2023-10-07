import React from 'react';
import { useLocation } from 'react-router-dom';

function ProjectDetails() {
  const location = useLocation();
  const project = location.state.project;

  return (
    
    <div>
      {console.log(project)}
      <div className="mx-2 my-2">
        <h1>Details of the project</h1>
        <div>
          <h4>Title:</h4>
          <p>{project.title}</p>
        </div>
        <div>
          <h4>Professor:</h4>
          <p>{project.professor}</p>
        </div>
        <div>
          <h4>Description:</h4>
          <p style={{whiteSpace:'break-spaces'}}>{project.description}</p>
        </div>
        <div>
          <h4>Institute:</h4>
          <p>{project.institute}</p>
        </div>
        <div>
          <h4>Date:</h4>
          <p>{project.updatedAt.substring(0,10)}</p>
        </div>
        <div>
          <h4>Abstract:</h4>          
          <p style={{whiteSpace:'break-spaces'}}>{project.abstract}</p>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;