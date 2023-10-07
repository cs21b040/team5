import React from 'react'
import ProjectDetailsComponent from '../Components/projectDetailsComponent'

function ProjectDetails(props) {
  return (
    <div>
      <div className="content">
        <ProjectDetailsComponent project={props.project}/>
      </div>
    </div>
  )
}
export default ProjectDetails