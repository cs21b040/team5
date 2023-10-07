import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import logo from './assets/iittp.png';
import ProjectDetailsComponent from './projectDetailsComponent';
import {useNavigate} from 'react-router-dom';

function Project(props) {
  const navigate=useNavigate();
  const info_click=()=> {
    <ProjectDetailsComponent project={props.projectInfo}/>
    navigate('/research/projectdetails');
  }
    return (
      <div className="mx-2 my-2">
        <Card style={{ width: '20rem' }}>
        <Card.Img variant="top" src={logo}/>
        <Card.Body>
          <Card.Title>{props.projectInfo.title}</Card.Title>
          <Card.Text>
            {props.projectInfo.professor} <br/>
            {props.projectInfo.description} <br/>
            {props.projectInfo.institute} <br/>
            {props.projectInfo.date}
          </Card.Text>
          <Button variant="info" onClick={info_click}>Get Info</Button>
        </Card.Body>
        </Card>
      </div>
    );
  }
  
export default Project;