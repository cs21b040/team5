import React from 'react';
import { useState } from 'react';
import Header from '../Components/Header.js';
import '../Components/Styles/Profile.css';

function Profile() {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [graduatedYear, setGraduatedYear] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [highestDegreeOfQualification, setHighestDegreeOfQualification] = useState('');
  const [Workedin, setWorkedin] = useState('');
  const [Workingin, setWorkingin] = useState('');
 

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Profile Page</h1>
        <div className="profile-info">

          {/* Box for Name */}
          <div className="state-box">
            <p>Name: {name}</p>
          </div>

          <div className="state-box">
            <p>Email: {email}</p>
          </div>
          
          <div className="state-box">
            <p>Graduated Year: {graduatedYear}</p>
          </div>
          
          <div className="state-box">
            <p>Discipline: {discipline}</p>
          </div>


         < div className="state-box">
            <p>Highest Degree of Qualification: {highestDegreeOfQualification}</p>
          </div>


          <div className="state-box">
            <p>Workedin: {Workedin}</p>
          </div>

          <div className="state-box">
            <p>Workingin: {Workingin}</p>
          </div>

          
        

        </div>
      </div>
    </div>
  );
}

export default Profile;
