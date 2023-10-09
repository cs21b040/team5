import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'
import '../Components/Styles/signup.css'
import { ChatState } from '../context/chatProvider';
function SignUp() {
  const {
    wantLogin,
    setWantLogin,
  }=ChatState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [college, setCollege] = useState('');
  const [user,setUser] =useState(' ');
  
  const [loading ,setLoading]=useState(false);
  const [discipline, setDiscipline] = useState('');
  const [branch, setBranch] = useState('');
  const [graduationyear, setGraduationyear] = useState('');
  const [highestDegreeOfQualification, setHighestDegreeOfQualification] = useState('');

  const [workingas, setWorkingas] = useState('');
  const [company, setCompany] = useState('');
  const navigate=useNavigate();
  const [step, setStep] = useState(1);

  const defaultImageURL = '/Profile.png';

  const [image,setImage]=useState();
  const [imagePreview, setImagePreview] = useState("/Profile.png");
  const [selectedImage, setSelectedImage] = useState(null);



  const nextStep = () => {
    setStep(step + 1);
  };
  // useEffect(() => {
  //   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //   setUser(userInfo);
    
  //   if (!userInfo) navigate("/login");
  // }, [navigate]);
  const handleSignUp = async ()=> {
    const collegeName=college;
    const userType=user;
    console.log(name);
    console.log(email);
    console.log(password);
    console.log(collegeName);
    console.log(userType);
    console.log(image);
    console.log(discipline);
    console.log(branch);
    console.log(graduationyear);
    console.log(workingas);
    console.log(company);
    console.log(highestDegreeOfQualification);

    if (!name||!email||!password||!college||!user) {
      alert("Please Fill All The Details");
      return;
    }
  
    const SignUpData = {
      name,
      email,
      password,
      collegeName,
      userType,
      image,
      discipline,
      branch,
      graduationyear,
      workingas,
      company,
      highestDegreeOfQualification,

    };
    console.log(SignUpData);
  
    try {
      setLoading(true);
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const pic=image;
      const { data } = await axios.post(
        'http://localhost:5000/api/user/',
        {
          name,
          email,
          collegeName,
          userType,
          password,
          pic,
          discipline,
          branch,
          graduationyear,
          workingas,
          company,
          highestDegreeOfQualification,

        },
        config
        ).catch((error)=>{
          console.log(error);
        });
        console.log(image);
        console.log("ih");
        console.log(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      navigate('/');
    } 
    catch (error) {
      if (error.response && error.response.status === 409) {
        alert("Email Already Exists");
      } else {
        console.error("An error occurred:", error);
      }
    }
  }
const postDetails=(image)=>{
  setLoading(true);
  if(image===undefined){
    alert("Please Select an Valid Image");
    return;
  }
  if(image.type==="image/jpeg" || image.type==="image/png"){
    const data=new FormData();
    data.append("file",image);
    data.append("upload_preset","chating");
    data.append("cloud_name","dq7oyedtj");
    fetch("https://api.cloudinary.com/v1_1/dq7oyedtj/image/upload",{
      method:"post",
      body:data
    }).then(res=>res.json())
    .then(data=>{
      setImage(data.url.toString());
      setLoading(false);
    })
    .catch((error)=>{
      console.log(error);
      setLoading(false);
    })
  }
  else{
    alert("Please Select an Valid jpeg or png Image");
    return;
  }

}
  return (
    <div className='box1'>
      <div className='container1'>
          <div className='first1'>
            <div className='header1'>
              <div className='position1'>Welcome,</div>
              <div className='position2'>Sign Up to access the website</div>
            </div>
          </div>
        {step === 1 && (
          <div className='second1'>
            <div className='header2'>
              <div className='position3'>Credentials</div>
            </div>
            <div className='inputs1'>
            <div className='input1'>
                <input type='name' onChange={(e) => setName(e.target.value)} placeholder='Name' />
              </div>
              <div className='input1'>
                <input type='email' onChange={(e) => setEmail(e.target.value)} placeholder='Email ID' />
              </div>
              <div className='input1'>
                <input type='password' onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
              </div>
              <div className='input2'>
               <div className='radio-button'>
                 <input type="radio" name="userType" onClick={
                  ()=>{
                    setUser("Student");
                  }
                } /> Student
              </div>
              <div className='radio-button'>
                <input type="radio" name="userType" onClick={
                  ()=>{
                    setUser("Professor");
                  }
                } /> Professor
              </div>
              <div className='radio-button'>
                <input type="radio" name="userType" onClick={
                  ()=>{
                    setUser("Alumni")
                  }
                } /> Alumni
              </div>
            </div>
            <div className="img" >
               <input type="file" 
                              name="avatar"
                              accept="image/*"
                              onChange={
                             (e)=>{
               
                               const file = e.target.files[0];
                                 setSelectedImage(file);
                                 postDetails(file);
               
              //  onChange={
              // (e)=>{
              //   postDetails(e.target.files[0])
              }} />
              {selectedImage ? (
    <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
  ) : (
    <img src={defaultImageURL} alt="Default" />
  )}

            </div>
            <div className='switch1' onClick={()=>{setWantLogin(!wantLogin)}}>Have an account? 
              <span onClick={()=>{setWantLogin(!wantLogin);navigate('./login')}} style={{color:'blue',cursor:"pointer",textDecoration:"underline"}}>Log In</span>
            </div>
            <div className='button1'>
              <input type='submit' value='Next' onClick={nextStep} />
            </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className='second2'>
            <div className='header2'>
              <div className='position3'>Education</div>
            </div>
            <div className='inputs1'>
            <div className='input1'>
                <input type='cname' onChange={(e) => setCollege(e.target.value)} placeholder='College Name' />
              </div>
            <div className='input1'>
                <input type='discipline' onChange={(e) => setDiscipline(e.target.value)} placeholder='Discipline' />
              </div>
              <div className='input1'>
                <input type='branch' onChange={(e) => setBranch(e.target.value)} placeholder='Branch' />
              </div>
              <div className='input1'>
                <input type='graduationyear' onChange={(e) => setGraduationyear(e.target.value)} placeholder='Graduation Year' />
              </div>
              <div className='input1'>
                <input type='highestdegreeofqualification' onChange={(e) => setHighestDegreeOfQualification(e.target.value)} placeholder='Highest degree of qualification' />
              </div>
              <div className='button1'>
              <input type='submit' value='Next' onClick={nextStep} />
            </div>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className='second3'>
            <div className='header2'>
              <div className='position3'>Professional</div>
            </div>
            <div className='inputs1'>
              <div className='input1'>
                <input type='workingas' onChange={(e) => setWorkingas(e.target.value)} placeholder='Working as' />
              </div>
              <div className='input1'>
                <input type='company' onChange={(e) => setCompany(e.target.value)} placeholder='Company' />
              </div>
              <div className='button1'>
              <input type="submit" value="Sign Up" onClick={handleSignUp} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SignUp