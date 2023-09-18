import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import logo from './assets/iittp.png';
import Project_info from './project_info';

function Project(props) {

  function info_click() {
    document.getElementById("lightbox").style.display = "block";
  }

    return (
      <div className="mx-2 my-2">
        <Card style={{ width: '20rem' }}>
        <Card.Img variant="top" src={logo}/>
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>
            {props.professor} <br/>
            {props.desc} <br/>
            {props.date}
          </Card.Text>
          <Button variant="info" onClick={info_click}>Get Info</Button>
        </Card.Body>
        </Card>
        <Project_info />
      </div>
    );
  }
  
export default Project;