import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import alumnipic from './assets/alumnipic.jpg';


function AlumniCard(props) {
    
    return (
      <div className="mx-2 my-2">
      <Card style={{ width: '20rem' }}>
      <Card.Img variant="top" src={props.pic}/>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          {props.company} <br/>
          {props.collegeName} 
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
      </Card>
    </div>
    );
  }
export default AlumniCard