import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Header from '../Components/Header';
import alumnipic from '../Components/assets/alumnipic.jpg';

function Alumni() {
  const [cardCount, setCardCount] = useState(0);

  function add_click(count) {
    setCardCount(count + 1);
  }

  const addCard = (cardNum) => {
    const cards = [];
    for (let i = 0; i < cardNum; i++) {
      cards.push(
        <div className="alumniCard" key={i}>
          <Card style={{ width: '20rem' }}>
            <Card.Img variant="top" src={alumnipic}/>
            <Card.Body>
              <Card.Title>Alumni Name</Card.Title>
              <Card.Text>
                Company Name <br/>
                Institute Name <br/>
                Small description about him
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </div>
      );
    }
    return cards;
  };

  return (
    <div>
      <Header />
      <h3>Alumni</h3>
      <div className='alumni'>
        <CardGroup>
          {addCard(cardCount)}
        </CardGroup>
      </div>
      <div>
        <button className='btn btn-success addProjectButton' onClick={() => add_click(cardCount)}>addCard</button>
      </div>
    </div>
  );
}

export default Alumni;
