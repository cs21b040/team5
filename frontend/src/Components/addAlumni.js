import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import alumnipic from './assets/alumnipic.jpg';

function AlumniCard(props) {
  const cardStyle = {
    width: '20rem',
    backgroundColor: '#f7f7f7', // Light gray background color
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Light box shadow
  };

  const imageStyle = {
    width: '319px',
    height: '300px',
  };

  return (
    <div className="mx-2 my-2">
      <Card style={cardStyle}>
        <Card.Img variant="top" src={props.pic} style={imageStyle} />
        <Card.Body>
          <Card.Title style={{ color: '#333' }}>{props.name}</Card.Title>
          <Card.Text>
            <span style={{ color: '#555' }}>{props.company}</span> <br />
            <span style={{ color: '#777' }}>{props.collegeName}</span>
          </Card.Text>
          <Button variant="primary">Chat</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AlumniCard;
