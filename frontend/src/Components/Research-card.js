import React, {useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import logo from './assets/iittp.png';
import axios from 'axios';
import { ChatState } from '../context/chatProvider';
import {useNavigate} from 'react-router-dom';
import './Styles/research.css'

function Project(props) {
  const {
    user,
  } = ChatState();
  const navigate = useNavigate();
  const info_click = () => {
    navigate('/research/projectdetails', { state: { project: props.projectInfo } });
  };

  async function onDeleteClick() {
    const config={
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      }
    }
    try {
      const res = await axios.delete('/api/research', { data: { projectId: props.projectInfo._id }, ...config });
      console.log(res);
      window.location.reload();
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  }

  function displayDeleteButton() {
    try {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        const prof= JSON.parse(userInfo).userId;
        if(props.projectInfo.userId==prof) {
          const deleteButton= document.querySelectorAll('.deleteButton');
          if(deleteButton){
            deleteButton.forEach((button) => {
              button.style.display= 'block';
            });
          }
        }
      }
    } catch (err) {
      console.error('Error displaying delete button:', err);
    }
  }

  useEffect(() => {
    displayDeleteButton();
  }, []);

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
          <Button variant="outline-danger" className="deleteButton" style={{display: 'none'}} onClick={onDeleteClick}>Delete Project</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Project;