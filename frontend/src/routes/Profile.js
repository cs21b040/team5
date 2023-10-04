import React from 'react';
import { useState ,useEffect} from 'react';
import Header from '../Components/Header.js';
import '../Components/Styles/Profile.css';
import { ChatState } from '../context/chatProvider';
import axios from 'axios';

function Profile() {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [graduatedYear, setGraduatedYear] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [highestDegreeOfQualification, setHighestDegreeOfQualification] = useState('');
  const [Workedin, setWorkedin] = useState('');
  const [Workingin, setWorkingin] = useState('');
 
  const [branch, setBranch] = useState('');

  const {user,} = ChatState();
  const [profile, setProfile] = useState([]);
  useEffect(
    ()=>{
      if(!user) return;
      setName(user.name);
      setEmail(user.email)
      setGraduatedYear(user.graduationyear)
      setBranch(user.branch)
      setDiscipline(user.discipline)
      setHighestDegreeOfQualification(user.highestDegreeOfQualification);
      setWorkedin(user.company);
      setWorkingin(user.workingas);
    },[user]
  )
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
            <p>Branch: {branch}</p>
          </div>

          {/* <div className="state-box">
            <p>Discipline: {discipline}</p>
          </div>
         */}
  
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
