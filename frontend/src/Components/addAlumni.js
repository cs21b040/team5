import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function AlumniCard(props) {
  const cardStyle = {
    width: '20rem',
    backgroundColor: '#333',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const imageStyle = {
    width: '319px',
    height: '300px',
  };

  const cardTitleStyle = {
    color: '#fff', 
  };

  const cardTextStyle = {
    color: '#aaa',
  };

  const buttonStyle = {
    backgroundColor: '#0056b3',
    borderColor: '#0056b3',
  };

  return (
    <div className="mx-2 my-2">
      <Card style={cardStyle}>
        <Card.Img variant="top" src={props.pic} style={imageStyle} />
        <Card.Body>
          <Card.Title style={cardTitleStyle}>{props.name}</Card.Title>
          <Card.Text style={cardTextStyle}>
            <span>{props.company}</span> <br />
            <span>{props.collegeName}</span>
          </Card.Text>
          <Link to="/personalchat">
          <Button variant="primary" style={buttonStyle}>
            Chat
          </Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AlumniCard;
