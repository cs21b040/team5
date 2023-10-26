// import React from 'react';
// import { useState ,useEffect} from 'react';
// import Header from '../Components/Header.js';
// import '../Components/Styles/Profile.css';
// import { ChatState } from '../context/chatProvider';
// import axios from 'axios';

// function Profile() {
  
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [graduatedYear, setGraduatedYear] = useState('');
//   const [discipline, setDiscipline] = useState('');
//   const [highestDegreeOfQualification, setHighestDegreeOfQualification] = useState('');
//   const [Workedin, setWorkedin] = useState('');
//   const [Workingin, setWorkingin] = useState('');
//   const[pic,setPic]=useState('');
//   const [branch, setBranch] = useState('');
//   const {user,} = ChatState();
//   const [profile, setProfile] = useState([]);
//   const [isEditing, setIsEditing] = useState(false); 
//   const [tempProfile, setTempProfile] = useState({});
//   useEffect(
//     ()=>{
//       if(!user) return;
//       setName(user.name);
//       setEmail(user.email)
//       setGraduatedYear(user.graduationyear)
//       setBranch(user.branch)
//       setDiscipline(user.discipline)
//       setHighestDegreeOfQualification(user.highestDegreeOfQualification);
//       setWorkedin(user.company);
//       setWorkingin(user.workingas);
//       setPic(user.pic);
//     },[user]
//   )

//   const handleEditClick = () => {
//     setTempProfile({
//       name,
//       email,
//       graduatedYear,
//       branch,
//       discipline,
//       highestDegreeOfQualification,
//       Workedin,
//       Workingin,
//       pic,
//     });
//     setIsEditing(true);
//   };

//   const handleSaveClick = () => {
//     // Update the user's profile with the tempProfile data
//     // You can use Axios or any other method to send the updated data to your backend
//     // Then, set isEditing back to false
//     setIsEditing(false);
//   };

//   return (
//     <div className="total">
//       <Header />
//       <div className="containerProfile">
          
//           <div className="profile-picture">
//              <img src={pic}  />
//             </div>

        
//        <div className="profile-info">
//         <h1>Profile Page</h1>
       
//           {/* Box for Name */}
//           <div className="state-box">
//             <p>Name: {name}</p>
//           </div>

//           <div className="state-box">
//             <p>Email: {email}</p>
//           </div>
          
//           <div className="state-box">
//             <p>Graduated Year: {graduatedYear}</p>
//           </div>
//           <div className="state-box">
//             <p>Branch: {branch}</p>
//           </div>

//           {/* <div className="state-box">
//             <p>Discipline: {discipline}</p>
//           </div>
//          */}
  
//          < div className="state-box">
//             <p>Highest Degree of Qualification: {highestDegreeOfQualification}</p>
//           </div>


//           <div className="state-box">
//             <p>Workedin: {Workedin}</p>
//           </div>

//           <div className="state-box">
//             <p>Workingin: {Workingin}</p>
//           </div>
//           <button onClick={handleEditClick}>Edit</button>
          
//         </div>



//       </div>
//     </div>
//   );
// }

// export default Profile;



import React, { useState, useEffect } from 'react';
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
  const [pic, setPic] = useState('');
  const [branch, setBranch] = useState('');
  const { user } = ChatState();
  const [profile, setProfile] = useState([]);
  const [isEditing, setIsEditing] = useState(false); 
  const [tempProfile, setTempProfile] = useState({}); 

  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setEmail(user.email);
    setGraduatedYear(user.graduationyear);
    setBranch(user.branch);
    setDiscipline(user.discipline);
    setHighestDegreeOfQualification(user.highestDegreeOfQualification);
    setWorkedin(user.company);
    setWorkingin(user.workingas);
    setPic(user.pic);
  }, [user]);


  const handleEditClick = () => {
    setTempProfile({
      name,
      email,
      graduatedYear,
      branch,
      discipline,
      highestDegreeOfQualification,
      Workedin,
      Workingin,
      pic,
    });
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setName(tempProfile.name);
    setEmail(tempProfile.email);
    setGraduatedYear(tempProfile.graduatedYear);
    setBranch(tempProfile.branch);
    setDiscipline(tempProfile.discipline);
    setHighestDegreeOfQualification(tempProfile.highestDegreeOfQualification);
    setWorkedin(tempProfile.Workedin);
    setWorkingin(tempProfile.Workingin);
    setPic(tempProfile.pic);
    setIsEditing(false); 
    

  };

  return (
    <div className="total">
      <Header />
      <div className="containerProfile">
        <div className="profile-picture">
          <img src={pic} alt="Profile" />
        </div>
        <div className="profile-info">
          <h1>Profile Page</h1>
          {!isEditing ? 
          ( 
        
            
            <div>
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
              <div className="state-box">
                <p>Discipline: {discipline}</p>
              </div>
              <div className="state-box">
                <p>Highest Degree of Qualification: {highestDegreeOfQualification}</p>
              </div>
              <div className="state-box">
                <p>Worked in: {Workedin}</p>
              </div>
              <div className="state-box">
                <p>Working in: {Workingin}</p>
              </div>
              <button onClick={handleEditClick}>Edit</button>
            </div>
          ) : (
            <div>




              <div className="state-box">
                <label>Name:</label>
                <input
                  type="text"
                  value={tempProfile.name}
                  onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                />
              </div>

             <div className="state-box">
                <label>graduatedYear:</label>
                <input
                  type="text"
                  value={tempProfile.graduatedYear}
                  onChange={(e) => setTempProfile({ ...tempProfile, graduatedYear: e.target.value })}
                />
              </div>

              <div className="state-box">
                <label>highestDegreeOfQualification:</label>
                <input
                  type="text"
                  value={tempProfile.highestDegreeOfQualification}
                  onChange={(e) => setTempProfile({ ...tempProfile, highestDegreeOfQualification: e.target.value })}
                />
              </div>

              <div className="state-box">
                <label>branch:</label>
                <input
                  type="text"
                  value={tempProfile.branch}
                  onChange={(e) => setTempProfile({ ...tempProfile, branch: e.target.value })}
                />
              </div>
              <div className="state-box">
                <label>Discipline:</label>
                <input
                  type="text"
                  value={tempProfile.Discipline}
                  onChange={(e) => setTempProfile({ ...tempProfile, Discipline: e.target.value })}
                />
              </div>

              <div className="state-box">
                <label>Workingin:</label>
                <input
                  type="text"
                  value={tempProfile.Workingin}
                  onChange={(e) => setTempProfile({ ...tempProfile, Workingin: e.target.value })}
                />
              </div>
              <div className="state-box">
                <label>Workedin:</label>
                <input
                  type="text"
                  value={tempProfile.Workedin}
                  onChange={(e) => setTempProfile({ ...tempProfile, Workedin: e.target.value })}
                />
              </div>
              
              
              <button onClick={handleSaveClick}>Save</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
