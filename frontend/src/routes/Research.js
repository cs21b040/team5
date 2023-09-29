import React from 'react';
import Header from '../Components/Header'; 
import Project from '../Components/Research-card';
import CardGroup from 'react-bootstrap/CardGroup';
import { useState } from 'react';


function Research() {

  function add_click(count) {
    
    addCard(count + 1);
    return count + 1;
  }

  const cardDetails = [
    {
      title: "Project Title",
      professor: "Professor Name",
      desc: "Short Description about the project",
      date: "dd-mm-yyyy"
    },
  ];

  const [cardCount, setCardCount] = useState(0);

  const addCard = (cardNum) => {
    const cards = [];
    for (let i = 0; i < cardNum; i++) {
      cards.push(
        <Project
          key={i}
          title={cardDetails[0].title}
          professor={cardDetails[0].professor}
          desc={cardDetails[0].desc}
          date={cardDetails[0].date}
        />
      );
    }
    return cards;
  };

  return (
    <div>
      <Header />
      <h3>Research</h3>
      <div className='container'>
        <CardGroup>
          {addCard(cardCount)}
        </CardGroup>
      </div>
      <div>
        <button className='btn btn-success addProjectButton' onClick={() => setCardCount(add_click(cardCount))}>Add Project</button>
      </div>
    </div>
  );
}

export default Research;