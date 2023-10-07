import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import logo from './assets/iittp.png';
import {useNavigate} from 'react-router-dom';

function Project(props) {
  const navigate = useNavigate();
  const info_click = () => {
    navigate('/research/projectdetails', { state: { project: props.projectInfo } });
  };

  const clickDelete = async () => {
    const userInfo = localStorage.getItem('userInfo');
    const user = JSON.parse(userInfo);
    

  }

  return (
    <div className="mx-2 my-2">
      <Card style={{ width: '20rem'}}>
        <Card.Img variant="top" src={logo}/>
        <Card.Body>
          <Card.Title>{props.projectInfo.title}</Card.Title>
          <Card.Text style={{ height: '150px', overflow: 'hidden' }}>
            {props.projectInfo.professor} <br/>
            {props.projectInfo.institute} <br/>
            {props.projectInfo.updatedAt.substring(0,10)} <br/>
            {props.projectInfo.description}
          </Card.Text>
          <Button variant="info" onClick={info_click}>Get Info</Button>
          <Button variant="outline-danger" className="mx-2" onClick={clickDelete}>Delete Project</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Project;