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
  const [searchText, setSearchText] = useState('');
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
          const userData = response.data;
          setalumnis(userData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []); 
    const filteredAlumnis = alumnis.filter((alumni) =>
    alumni.name.toLowerCase().includes(searchText.toLowerCase())
  );
    return (
      <div className='CardGroup'>
        {filteredAlumnis.map((Card,temp) => {
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
  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div>
      <Header />
      <div className="templateContainer">
        <div className="searchInput_Container">
          <input
            className="searchInput"
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={handleSearchInputChange}
          />
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
