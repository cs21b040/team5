import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'
import '../Components/Styles/signup.css'
function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [college, setCollege] = useState('');
  const [user,setUser] =useState(' ');
  const [image,setImage]=useState();
  const [loading ,setLoading]=useState(false);
  const navigate=useNavigate();
  const handleSignUp = async ()=> {
    const collegeName=college;
    const userType=user;
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
    };
    console.log(SignUpData);
  
    try {
      setLoading(true);
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        'http://localhost:5000/api/user/',
        {
          name,
          email,
          collegeName,
          userType,
          password,
          image,
        },
        config
        );
        console.log("ih");
        console.log(data);
      // localStorage.setItem('userInfo', JSON.stringify(data));
      // setLoading(false);
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
          <div className="header1">
            <div className="position1">Welcome,</div>
            <div className="position2">Sign Up to access the website</div>
          </div>
        </div>
        <div className='second1'>
          <div className="header2">
            <div className="position3">Sign Up</div>
          </div>
          <div className='inputs1'>
            <div className='input1'>
              <input type="name" onChange={(e)=>{setName(e.target.value)}} placeholder='Name' /> 
            </div>
            <div className='input1'>
              <input type="email" onChange={(e)=>{setEmail(e.target.value)}}placeholder='Email ID'/>
            </div>
            <div className='input1'>
              <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password'/>
            </div>
            <div className='input1'>
              <input type="college" onChange={(e)=>{setCollege(e.target.value)}} placeholder='College Name' /> 
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
              <input type="file" onChange={
              (e)=>{
                postDetails(e.target.files[0])
              }} />
              <img src={image}/>
            </div>
            <div className='button1'>
              <input type="submit" value="Sign Up" onClick={handleSignUp} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp