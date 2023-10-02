import React from 'react';
import CardGroup from 'react-bootstrap/CardGroup';
import Header from '../Components/Header';
import { useState, useEffect } from 'react';
import { ChatState } from '../context/chatProvider';
import '../Components/Styles/alumni.css'
import AlumniCard from '../Components/addAlumni';
import axios from 'axios';
function Alumni() {
  const {
    user
  }=ChatState();
  function CardsDisplay() {
    const [alumnis, setalumnis] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        if(!user) return;
        try {
          const response = await axios.get('http://localhost:5000/api/user/', {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          const alumniData = response.data;
          setalumnis(alumniData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []); 
  
    return (
      <div className='CardGroup'>
        {alumnis.map((Card,temp) => {
           return (
             <AlumniCard key={temp}
            name={Card.name}
            company={Card.company}
            collageName={Card.collageName}
            />

           )
            
  })}
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="templateContainer">
        <div className="searchInput_Container">
          <input className="searchInput" type="text" placeholder="Search" />
        </div>
      </div>
      <h3>Alumni</h3>
      <div className='alumni'>
        <CardGroup>
          <CardsDisplay />
        </CardGroup>
      </div>
      
    </div>
  );
}

export default Alumni;
